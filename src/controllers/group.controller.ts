import {Request, Response} from "express";
import models from "../database/models";
/*
// Controlador para Grupos
export const getAllGroups = async (req: Request, res: Response): Promise<void> => {
  try {
    const groups = await models.Group.findAll({paranoid: false});
    res.json(groups);
  } catch (error) {
    console.error("❌ Error al obtener los grupos:", error);
    res.status(500).json({error: "Error al obtener los grupos"});
  }
};
*/
// Controlador para Grupos
export const getGroups = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all} = req.query;

    const groups = await models.Group.findAll({
      paranoid: all ? true : false,
    });
    res.json(groups);
  } catch (error) {
    console.error("❌ Error al obtener los grupos:", error);
    res.status(500).json({error: "Error al obtener los grupos"});
  }
};

export const getGroupById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const group = await models.Group.findByPk(id);
    if (!group) {
      res.status(404).json({error: "Grupo no encontrado"});
      return;
    }
    res.json(group);
  } catch (error) {
    console.error("❌ Error al obtener el grupo:", error);
    res.status(500).json({error: "Error al obtener el grupo"});
  }
};

export const createGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const newGroup = await models.Group.create(req.body);
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("❌ Error al crear el grupo:", error);
    res.status(500).json({error: "Error al crear el grupo"});
  }
};

export const updateGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempGroup = await models.Group.findByPk(id);
    if (!TempGroup) {
      res.status(404).json({error: "Grupo no encontrado"});
      return;
    }
    console.log(req.body);
    await TempGroup.update(req.body);
    res.json(TempGroup);
  } catch (error) {
    console.error("❌ Error al actualizar el grupo:", error);
    res.status(500).json({error: "Error al actualizar el grupo"});
  }
};

export const deleteGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const group = await models.Group.findByPk(id);
    if (!group) {
      res.status(404).json({error: "Grupo no encontrado"});
      return;
    }
    await group.destroy();
    res.json({message: "Grupo eliminado correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar el grupo:", error);
    res.status(500).json({error: "Error al eliminar el grupo"});
  }
};

export const recoverGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempGroup = await models.Group.findByPk(id, {paranoid: false});
    if (!TempGroup) {
      res.status(404).json({error: "Grupo no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempGroup.restore();

    // Busca nuevamente el registro para confirmar
    const updatedGroup = await models.Group.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedGroup);
  } catch (error) {
    console.error("❌ Error al recuperar el grupo:", error);
    res.status(500).json({error: "Error al recuperar el grupo"});
  }
};
