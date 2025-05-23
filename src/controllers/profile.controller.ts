import {Request, Response} from "express";

import models from "../database/models";
import bcryptjs from "bcryptjs";

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempUser = await models.User.findByPk(id, {
      include: [
        {model: models.Group},
        {
          model: models.Permission,
          required: true,
          include: [{model: models.Sector}],
        },
      ],
    });
    if (!TempUser) {
      res.status(404).json({error: "Usuario no encontrado"});
      return;
    }
    const {name, lastname, birthday, image, phone, id_group} = req.body;
    await TempUser.update({name, lastname, birthday, image, phone, id_group});
    res.json(TempUser);
  } catch (error) {
    console.error("❌ Error al actualizar el usuario:", error);
    res.status(500).json({error: "Error al actualizar el usuario"});
  }
};

export const updatePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const {oldPassword, newPassword} = req.body;

    // Verificar que se envíen las contraseñas
    if (!oldPassword || !newPassword) {
      res.status(400).json({error: "Las contraseñas antigua y nueva son obligatorias"});
      return;
    }

    // Buscar el usuario por su ID
    const TempUser = await models.User.findByPk(id);
    if (!TempUser) {
      res.status(404).json({error: "Usuario no encontrado"});
      return;
    }

    // Validar la contraseña antigua
    const userPass = TempUser.get("pass") as string;
    const isMatch = await bcryptjs.compare(oldPassword, userPass); // Suponiendo que "pass" es el campo de contraseña
    if (!isMatch) {
      res.status(400).json({error: "La contraseña antigua es incorrecta"});
      return;
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcryptjs.hash(newPassword, 8);

    // Actualizar la contraseña
    await TempUser.update({pass: hashedPassword});

    res.json({message: "Contraseña actualizada exitosamente"});
  } catch (error) {
    console.error("❌ Error al actualizar la contraseña:", error);
    res.status(500).json({error: "Error al actualizar la contraseña"});
  }
};
