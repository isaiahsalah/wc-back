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
