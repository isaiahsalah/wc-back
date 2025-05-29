import {Request, Response} from "express";
import models from "../database/models";

export const getUnits = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all} = req.query;

    const unities = await models.Unit.findAll({
      paranoid: all ? false : true,
    });
    res.json(unities);
  } catch (error) {
    console.error("❌ Error al obtener las unidades:", error);
    res.status(500).json({error: "Error al obtener las unidades"});
  }
};

export const getUnitById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const unity = await models.Unit.findByPk(id);
    if (!unity) {
      res.status(404).json({error: "Unidad no encontrada"});
      return;
    }
    res.json(unity);
  } catch (error) {
    console.error("❌ Error al obtener la unidad:", error);
    res.status(500).json({error: "Error al obtener la unidad"});
  }
};

export const createUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUnity = await models.Unit.create(req.body);

    res.status(201).json(newUnity);
  } catch (error) {
    console.error("❌ Error al crear la unidad:", error);
    res.status(500).json({error: "Error al crear la unidad"});
  }
};

export const updateUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempUnity = await models.Unit.findByPk(id);
    if (!TempUnity) {
      res.status(404).json({error: "Unidad no encontrada"});
      return;
    }
    console.log(req.body);
    await TempUnity.update(req.body);
    res.json(TempUnity);
  } catch (error) {
    console.error("❌ Error al actualizar la unidad:", error);
    res.status(500).json({error: "Error al actualizar la unidad"});
  }
};

export const softDeleteUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const unit = await models.Unit.findByPk(id);
    if (!unit) {
      res.status(404).json({error: "Unidad no encontrada"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await unit.destroy();

    res.status(200).json({message: "Unidad eliminada lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar la unidad lógicamente"});
  }
};

export const hardDeleteUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const unit = await models.Unit.findOne({where: {id}, paranoid: false});
    if (!unit) {
      res.status(404).json({error: "Unidad no encontrada"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await unit.destroy({force: true});

    res.status(200).json({message: "Unidad eliminada completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar la unidad completamente"});
  }
};

export const recoverUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempUnity = await models.Unit.findByPk(id, {paranoid: false});
    if (!TempUnity) {
      res.status(404).json({error: "Unidad no encontrada"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempUnity.restore();

    // Busca nuevamente el registro para confirmar
    const updatedUnity = await models.Unit.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedUnity);
  } catch (error) {
    console.error("❌ Error al recuperar la unidad:", error);
    res.status(500).json({error: "Error al recuperar la unidad"});
  }
};
