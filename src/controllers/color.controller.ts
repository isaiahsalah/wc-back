import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Colores
export const getColors = async (req: Request, res: Response): Promise<void> => {
  try {
    const colors = await models.Color.findAll();
    res.json(colors);
  } catch (error) {
    console.error("❌ Error al obtener los colores:", error);
    res.status(500).json({ error: "Error al obtener los colores" });
  }
};

export const getColorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const color = await models.Color.findByPk(id);
    if (!color) {
      res.status(404).json({ error: "Color no encontrado" });
      return;
    }
    res.json(color);
  } catch (error) {
    console.error("❌ Error al obtener el color:", error);
    res.status(500).json({ error: "Error al obtener el color" });
  }
};

export const createColor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, hexCode } = req.body;
    const newColor = await models.Color.create({ name, hexCode });
    res.status(201).json(newColor);
  } catch (error) {
    console.error("❌ Error al crear el color:", error);
    res.status(500).json({ error: "Error al crear el color" });
  }
};

export const updateColor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempColor = await models.Color.findByPk(id);
    if (!TempColor) {
      res.status(404).json({ error: "Color no encontrado" });
      return;
    }

    await TempColor.update(req.body);
    console.log(req.body)
    res.json(TempColor);
  } catch (error) {
    console.error("❌ Error al actualizar el color:", error);
    res.status(500).json({ error: "Error al actualizar el color" });
  }
};

export const deleteColor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const color = await models.Color.findByPk(id);
    if (!color) {
      res.status(404).json({ error: "Color no encontrado" });
      return;
    }
    await color.destroy();
    res.json({ message: "Color eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el color:", error);
    res.status(500).json({ error: "Error al eliminar el color" });
  }
};
