import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Permissions
export const getAllPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const permissions = await models.Permission.findAll({ paranoid: false });
    res.json(permissions);
  } catch (error) {
    console.error("❌ Error al obtener los permisos:", error);
    res.status(500).json({ error: "Error al obtener los permisos" });
  }
};

export const getPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const permissions = await models.Permission.findAll();
    res.json(permissions);
  } catch (error) {
    console.error("❌ Error al obtener los permisos:", error);
    res.status(500).json({ error: "Error al obtener los permisos" });
  }
};

export const getPermissionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const permission = await models.Permission.findByPk(id);
    if (!permission) {
      res.status(404).json({ error: "Permiso no encontrado" });
      return;
    }
    res.json(permission);
  } catch (error) {
    console.error("❌ Error al obtener el permiso:", error);
    res.status(500).json({ error: "Error al obtener el permiso" });
  }
};

export const createPermission = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newPermission = await models.Permission.create(req.body);
    res.status(201).json(newPermission);
  } catch (error) {
    console.error("❌ Error al crear el permiso:", error);
    res.status(500).json({ error: "Error al crear el permiso" });
  }
};

export const updatePermission = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempPermission = await models.Permission.findByPk(id);
    if (!TempPermission) {
      res.status(404).json({ error: "Permiso no encontrado" });
      return;
    }
    console.log(req.body);
    await TempPermission.update(req.body);
    res.json(TempPermission);
  } catch (error) {
    console.error("❌ Error al actualizar el permiso:", error);
    res.status(500).json({ error: "Error al actualizar el permiso" });
  }
};

export const deletePermission = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const permission = await models.Permission.findByPk(id);
    if (!permission) {
      res.status(404).json({ error: "Permiso no encontrado" });
      return;
    }
    await permission.destroy();
    res.json({ message: "Permiso eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el permiso:", error);
    res.status(500).json({ error: "Error al eliminar el permiso" });
  }
};

export const recoverPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempPermission = await models.Permission.findByPk(id, { paranoid: false });
    if (!TempPermission) {
      res.status(404).json({ error: "Permiso no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempPermission.restore();

    // Busca nuevamente el registro para confirmar
    const updatedPermission = await models.Permission.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedPermission);
  } catch (error) {
    console.error("❌ Error al recuperar el permiso:", error);
    res.status(500).json({ error: "Error al recuperar el permiso" });
  }
};