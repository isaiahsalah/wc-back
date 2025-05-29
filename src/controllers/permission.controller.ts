import {Request, Response} from "express";
import models from "../database/models";
/*
// Controlador para Permissions
export const getAllPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const permissions = await models.Permission.findAll({ paranoid: false });
    res.json(permissions);
  } catch (error) {
    console.error("❌ Error al obtener los permisos:", error);
    res.status(500).json({ error: "Error al obtener los permisos" });
  }
};*/

export const getPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all} = req.query;

    const permissions = await models.Permission.findAll({
      paranoid: all ? false : true,
    });
    res.json(permissions);
  } catch (error) {
    console.error("❌ Error al obtener los permisos:", error);
    res.status(500).json({error: "Error al obtener los permisos"});
  }
};

export const getPermissionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const permission = await models.Permission.findByPk(id);
    if (!permission) {
      res.status(404).json({error: "Permiso no encontrado"});
      return;
    }
    res.json(permission);
  } catch (error) {
    console.error("❌ Error al obtener el permiso:", error);
    res.status(500).json({error: "Error al obtener el permiso"});
  }
};

export const createPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPermission = await models.Permission.create(req.body);
    res.status(201).json(newPermission);
  } catch (error) {
    console.error("❌ Error al crear el permiso:", error);
    res.status(500).json({error: "Error al crear el permiso"});
  }
};

export const updatePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempPermission = await models.Permission.findByPk(id);
    if (!TempPermission) {
      res.status(404).json({error: "Permiso no encontrado"});
      return;
    }
    console.log(req.body);
    await TempPermission.update(req.body);
    res.json(TempPermission);
  } catch (error) {
    console.error("❌ Error al actualizar el permiso:", error);
    res.status(500).json({error: "Error al actualizar el permiso"});
  }
};

export const softDeletePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const permission = await models.Permission.findByPk(id);
    if (!permission) {
      res.status(404).json({error: "Permiso no encontrado"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await permission.destroy();

    res.status(200).json({message: "Permiso eliminado lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar el permiso lógicamente"});
  }
};

export const hardDeletePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const permission = await models.Permission.findOne({where: {id}, paranoid: false});
    if (!permission) {
      res.status(404).json({error: "Permiso no encontrado"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await permission.destroy({force: true});

    res.status(200).json({message: "Permiso eliminado completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar el permiso completamente"});
  }
};

export const recoverPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempPermission = await models.Permission.findByPk(id, {paranoid: false});
    if (!TempPermission) {
      res.status(404).json({error: "Permiso no encontrado"});
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
    res.status(500).json({error: "Error al recuperar el permiso"});
  }
};
