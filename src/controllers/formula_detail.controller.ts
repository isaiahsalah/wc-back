import {Request, Response} from "express";
import models from "../database/models";

export const getFormulaDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all} = req.query;

    const formulaDetails = await models.FormulaCost.findAll({
      paranoid: all ? false : true,

      include: [models.Product],
    });
    res.json(formulaDetails);
  } catch (error) {
    console.error("❌ Error al obtener los detalles de fórmula:", error);
    res.status(500).json({error: "Error al obtener los detalles de fórmula"});
  }
};

export const getFormulaDetailById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const formulaDetail = await models.FormulaCost.findByPk(id);
    if (!formulaDetail) {
      res.status(404).json({error: "Detalle de fórmula no encontrado"});
      return;
    }
    res.json(formulaDetail);
  } catch (error) {
    console.error("❌ Error al obtener el detalle de fórmula:", error);
    res.status(500).json({error: "Error al obtener el detalle de fórmula"});
  }
};

export const createFormulaDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const newFormulaDetail = await models.FormulaCost.create(req.body);
    res.status(201).json(newFormulaDetail);
  } catch (error) {
    console.error("❌ Error al crear el detalle de fórmula:", error);
    res.status(500).json({error: "Error al crear el detalle de fórmula"});
  }
};

export const updateFormulaDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const formulaDetail = await models.FormulaCost.findByPk(id);
    if (!formulaDetail) {
      res.status(404).json({error: "Detalle de fórmula no encontrado"});
      return;
    }
    await formulaDetail.update(req.body);
    res.json(formulaDetail);
  } catch (error) {
    console.error("❌ Error al actualizar el detalle de fórmula:", error);
    res.status(500).json({error: "Error al actualizar el detalle de fórmula"});
  }
};

export const deleteFormulaDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const formulaDetail = await models.FormulaCost.findByPk(id);
    if (!formulaDetail) {
      res.status(404).json({error: "Detalle de fórmula no encontrado"});
      return;
    }
    await formulaDetail.destroy();
    res.json({message: "Detalle de fórmula eliminado correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar el detalle de fórmula:", error);
    res.status(500).json({error: "Error al eliminar el detalle de fórmula"});
  }
};

export const recoverFormulaDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempFormulaDetail = await models.FormulaCost.findByPk(id, {paranoid: false});
    if (!TempFormulaDetail) {
      res.status(404).json({error: "FormulaDetail no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempFormulaDetail.restore();

    // Busca nuevamente el registro para confirmar
    const updatedFormulaDetail = await models.FormulaCost.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedFormulaDetail);
  } catch (error) {
    console.error("❌ Error al recuperar el FormulaDetail:", error);
    res.status(500).json({error: "Error al recuperar el FormulaDetail"});
  }
};
