import {NextFunction, Request, Response} from "express";

import bcryptjs from "bcryptjs";
import jwt, {JwtPayload} from "jsonwebtoken";
import {IUser} from "../utils/interfaces";
import models from "../database/models";

const jwtSecret = process.env.JWT_SECRET || "1234";

export async function postLogin(req: Request, res: Response): Promise<void> {
  try {
    const {user, pass, type_module} = req.body;

    if (!user || !pass) {
      // Validar la presencia de los campos necesarios
      res.status(400).json({message: "Usuario y contraseña son requeridos"});
      return;
    }

    // Buscar usuario en la base de datos
    const foundUser = (await models.User.findOne({
      where: {user: (user as string).toLowerCase()},
      include: [
        {model: models.Group},
        {
          model: models.Permission,
          required: true,
          include: [{model: models.Sector}],
          where: {type_module},
        },
      ],
    })) as IUser | null;

    if (!foundUser) {
      // Usuario no encontrado
      res.status(404).json({message: "Usuario no encontrado"});
      return;
    }

    // Verificar contraseña
    const isPasswordValid = await bcryptjs.compare(pass, foundUser.pass);

    if (!isPasswordValid && type_module) {
      // Contraseña incorrecta
      res.status(401).json({message: "Contraseña incorrecta"});
      return;
    }

    // Verificar que el secreto JWT esté definido
    if (!jwtSecret) {
      console.error("JWT_SECRET no está definido");
      res.status(500).json({error: "Configuración del servidor incorrecta"});
      return;
    }

    // Preparar datos para el token
    const userPayload = {
      id: foundUser.id,
      type_module: type_module,
    };

    // Generar token de autenticación
    const token = jwt.sign(userPayload, jwtSecret, {expiresIn: "1h"});
    console.log("😁😁😁😁", foundUser);
    // Responder con éxito
    res.status(200).json({
      user: foundUser,
      token,
    });
  } catch (error) {
    // Manejo de errores inesperados
    console.error("Error en el proceso de inicio de sesión:", error);
    res.status(500).json({error: "Error en el proceso de inicio de sesión"});
  }
}

export async function getCheckToken(req: Request, res: Response): Promise<void> {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({error: "No se encontró el encabezado de autorización"});
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({error: "Falta el token"});
    return;
  }

  try {
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        res.status(403).json({error: "El token es inválido o ha expirado"});
        return;
      }

      // Verificar si decoded es un JwtPayload
      if (decoded && typeof decoded !== "string") {
        const userId = (decoded as JwtPayload).id; // Accede al campo 'id'
        const type_module = (decoded as JwtPayload).type_module; // Accede al campo 'id'

        console.log("😊😊😊", decoded, token);

        if (userId && type_module) {
          const foundUser = (await models.User.findOne({
            where: {id: userId as string},

            include: [
              {model: models.Group},
              {
                model: models.Permission,
                required: true,
                include: [{model: models.Sector}],
                where: {type_module},
              },
            ],
          })) as IUser | null;

          if (!foundUser) {
            // Usuario no encontrado
            res.status(404).json({message: "Usuario no encontrado"});
            return;
          }
          // Preparar datos para el token
          const userPayload = {
            id: foundUser.id,
            type_module: type_module,
          };
          const token = jwt.sign(userPayload, jwtSecret, {expiresIn: "1h"});

          // Responder con éxito
          res.status(200).json({
            user: foundUser,
            token: token,
          });
        } else {
          res.status(400).json({error: "Token no contiene un ID válido"});
        }
      } else {
        res.status(400).json({error: "Token no contiene un payload válido"});
      }
    });
  } catch (err) {
    res.status(403).json({error: "El token es inválido o ha expirado"});
  }
}

// Middleware para verificar el token en rutas protegidas
export const authToken = (req: Request, res: Response, next: NextFunction): void => {
  // Verificar si el encabezado de autorización está presente
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({error: "No se encontró el encabezado de autorización"});
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({error: "Falta el token"});
    return;
  }

  // Verificar el token utilizando la clave secreta
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      // Respuesta de error en caso de un token inválido
      res.status(403).json({error: "El token es inválido o ha expirado"});
      return;
    }

    // Extraemos userId del JWT decodificado
    const userId = (decoded as {userId: number}).userId;

    // Si el token es válido, guardar la información del usuario en la solicitud
    //req.userId = userId;
    next(); // Continuar con la siguiente función del middleware o la ruta
  });
};
