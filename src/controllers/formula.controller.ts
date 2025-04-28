import { Request, Response } from "express";
import models from "../database/models";

export const getFormulas = async (req: Request, res: Response): Promise<void> => {
  try {
    const formulas = await models.Formula.findAll();
    res.json(formulas);
  } catch (error) {
    console.error("❌ Error al obtener las fórmulas:", error);
    res.status(500).json({ error: "Error al obtener las fórmulas" });
  }
};

export const getAllFormulas = async (req: Request, res: Response): Promise<void> => {
  try {
    const formulas = await models.Formula.findAll({ paranoid: false,
     // include:[models.Product]  
    });
    res.json(formulas);
  } catch (error) {
    console.error("❌ Error al obtener las fórmulas:", error);
    res.status(500).json({ error: "Error al obtener las fórmulas" });
  }
};

export const getFormulaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const formula = await models.Formula.findByPk(id);
    if (!formula) {
      res.status(404).json({ error: "Fórmula no encontrada" });
      return;
    }
    res.json(formula);
  } catch (error) {
    console.error("❌ Error al obtener la fórmula:", error);
    res.status(500).json({ error: "Error al obtener la fórmula" });
  }
};

export const createFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const newFormula = await models.Formula.create(req.body);
    res.status(201).json(newFormula);
  } catch (error) {
    console.error("❌ Error al crear la fórmula:", error);
    res.status(500).json({ error: "Error al crear la fórmula" });
  }
};

export const updateFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const formula = await models.Formula.findByPk(id);
    if (!formula) {
      res.status(404).json({ error: "Fórmula no encontrada" });
      return;
    }
    await formula.update(req.body);
    res.json(formula);
  } catch (error) {
    console.error("❌ Error al actualizar la fórmula:", error);
    res.status(500).json({ error: "Error al actualizar la fórmula" });
  }
};

export const deleteFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const formula = await models.Formula.findByPk(id);
    if (!formula) {
      res.status(404).json({ error: "Fórmula no encontrada" });
      return;
    }
    await formula.destroy();
    res.json({ message: "Fórmula eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar la fórmula:", error);
    res.status(500).json({ error: "Error al eliminar la fórmula" });
  }
};


export const recoverFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempFormula = await models.Formula.findByPk(id, { paranoid: false });
    if (!TempFormula) {
      res.status(404).json({ error: "Formula no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempFormula.restore();
    
    // Busca nuevamente el registro para confirmar
    const updatedFormula = await models.Formula.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedFormula);

  } catch (error) {
    console.error("❌ Error al recuperar el Formula:", error);
    res.status(500).json({ error: "Error al recuperar el Formula" });
  }
};