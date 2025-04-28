import { NextFunction, Request, Response } from "express";

import models from "../database/models";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../utils/interfaces";

const jwtSecret = process.env.JWT_SECRET || "1234";

// Controlador para Users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await models.User.findAll({ paranoid: false });
    res.json(users);
  } catch (error) {
    console.error("❌ Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await models.User.findAll();
    res.json(users);
  } catch (error) {
    console.error("❌ Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await models.User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("❌ Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = await models.User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempUser = await models.User.findByPk(id);
    if (!TempUser) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    console.log(req.body);
    await TempUser.update(req.body);
    res.json(TempUser);
  } catch (error) {
    console.error("❌ Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await models.User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export const recoverUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempUser = await models.User.findByPk(id, { paranoid: false });
    if (!TempUser) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempUser.restore();

    // Busca nuevamente el registro para confirmar
    const updatedUser = await models.User.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedUser);
  } catch (error) {
    console.error("❌ Error al recuperar el usuario:", error);
    res.status(500).json({ error: "Error al recuperar el usuario" });
  }
};

export async function login(req: Request, res: Response): Promise<void> {
  const { user, pass } = req.body; // Desestructuración para mayor claridad

  try {
    // Buscar usuario en la base de datos
    const foundUser = (await models.User.findOne({
      where: { user },
    })) as IUser | null;
    if (!foundUser) {
      res.status(404).json({ message: "Usuario no encontrado" }); // Código 404 para recurso no encontrado
      return;
    }

    // Verificar contraseña
    const isPasswordValid =
      foundUser && (await bcryptjs.compare(pass, foundUser.pass));
    if (!isPasswordValid) {
      res.status(401).json({ message: "Contraseña incorrecta" }); // Código 401 para credenciales inválidas
      return;
    }

    // Preparar datos del usuario para el token
    const userPayload = {
      userId: foundUser.id, 
    };

    // Generar token de autenticación
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(userPayload, jwtSecret, { expiresIn: "1h" }); // Opcional: Agregar un tiempo de expiración

    // Responder con éxito
    res.status(200).json({
      login: userPayload,
      token,
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    // Manejo de errores inesperados
    console.error("Error en el proceso de inicio de sesión:", error); // Log para depuración
    res.status(500).json({ error: "Error en el proceso de inicio de sesión" });
  }
}

export async function checkToken(req: Request, res: Response): Promise<void> {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res
      .status(401)
      .json({ error: "No se encontró el encabezado de autorización" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Falta el token" });
    return;
  }

  try {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        res.status(403).json({ error: "El token es inválido o ha expirado" });
        return;
      }
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(403).json({ error: "El token es inválido o ha expirado" });
  }
}

// Middleware para verificar el token en rutas protegidas
export const authToken = (req: Request, res: Response, next: NextFunction): void => {
  // Verificar si el encabezado de autorización está presente
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res
      .status(401)
      .json({ error: "No se encontró el encabezado de autorización" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Falta el token" });
    return;
  }

  // Verificar el token utilizando la clave secreta
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      // Respuesta de error en caso de un token inválido
      res.status(403).json({ error: "El token es inválido o ha expirado" });
      return;
    }

    // Extraemos userId del JWT decodificado
    const userId = (decoded as { userId: number }).userId;

    // Si el token es válido, guardar la información del usuario en la solicitud
    //req.userId = userId;
    next(); // Continuar con la siguiente función del middleware o la ruta
  });
};
