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
export const getWorkGroups = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all} = req.query;

    const groups = await models.WorkGroup.findAll({
      paranoid: all ? false : true,
    });
    res.json(groups);
  } catch (error) {
    console.error("❌ Error al obtener los grupos:", error);
    res.status(500).json({error: "Error al obtener los grupos"});
  }
};

export const getWorkGroupById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const group = await models.WorkGroup.findByPk(id);
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

export const createWorkGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const newGroup = await models.WorkGroup.create(req.body);
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("❌ Error al crear el grupo:", error);
    res.status(500).json({error: "Error al crear el grupo"});
  }
};

export const updateWorkGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempGroup = await models.WorkGroup.findByPk(id);
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

export const softDeleteWorkGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const workGroup = await models.WorkGroup.findByPk(id);
    if (!workGroup) {
      res.status(404).json({error: "Grupo de trabajo no encontrado"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await workGroup.destroy();

    res.status(200).json({message: "Grupo de trabajo eliminado lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar el grupo de trabajo lógicamente"});
  }
};

export const hardDeleteWorkGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const workGroup = await models.WorkGroup.findOne({where: {id}, paranoid: false});
    if (!workGroup) {
      res.status(404).json({error: "Grupo de trabajo no encontrado"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await workGroup.destroy({force: true});

    res.status(200).json({message: "Grupo de trabajo eliminado completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar el grupo de trabajo completamente"});
  }
};

export const recoverWorkGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempGroup = await models.WorkGroup.findByPk(id, {paranoid: false});
    if (!TempGroup) {
      res.status(404).json({error: "Grupo no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempGroup.restore();

    // Busca nuevamente el registro para confirmar
    const updatedGroup = await models.WorkGroup.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedGroup);
  } catch (error) {
    console.error("❌ Error al recuperar el grupo:", error);
    res.status(500).json({error: "Error al recuperar el grupo"});
  }
};
