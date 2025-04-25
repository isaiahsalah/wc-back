import { Request, Response } from "express";
import models from "../database/models";

export const getAllProductions = async (req: Request, res: Response): Promise<void> => {
  try {
    const productions = await models.Production.findAll({ paranoid: false });
    res.json(productions);
  } catch (error) {
    console.error("❌ Error al obtener las producciones:", error);
    res.status(500).json({ error: "Error al obtener las producciones" });
  }
};

export const getProductionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({ error: "Producción no encontrada" });
      return;
    }
    res.json(production);
  } catch (error) {
    console.error("❌ Error al obtener la producción:", error);
    res.status(500).json({ error: "Error al obtener la producción" });
  }
};

export const createProduction = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduction = await models.Production.create(req.body);
    res.status(201).json(newProduction);
  } catch (error) {
    console.error("❌ Error al crear la producción:", error);
    res.status(500).json({ error: "Error al crear la producción" });
  }
};

export const updateProduction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({ error: "Producción no encontrada" });
      return;
    }
    await production.update(req.body);
    res.json(production);
  } catch (error) {
    console.error("❌ Error al actualizar la producción:", error);
    res.status(500).json({ error: "Error al actualizar la producción" });
  }
};

export const deleteProduction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({ error: "Producción no encontrada" });
      return;
    }
    await production.destroy();
    res.json({ message: "Producción eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar la producción:", error);
    res.status(500).json({ error: "Error al eliminar la producción" });
  }
};