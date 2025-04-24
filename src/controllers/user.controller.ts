import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
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

export const recoverUser = async (req: Request, res: Response): Promise<void> => {
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