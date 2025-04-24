import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await models.Category.findAll({ paranoid: false });
    res.json(categories);
  } catch (error) {
    console.error("❌ Error al obtener las categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await models.Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("❌ Error al obtener las categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await models.Category.findByPk(id);
    if (!category) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error("❌ Error al obtener la categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCategory = await models.Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("❌ Error al crear la categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempCategory = await models.Category.findByPk(id);
    if (!TempCategory) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }
    console.log(req.body);
    await TempCategory.update(req.body);
    res.json(TempCategory);
  } catch (error) {
    console.error("❌ Error al actualizar la categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await models.Category.findByPk(id);
    if (!category) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }
    await category.destroy();
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar la categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

export const recoverCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempCategory = await models.Category.findByPk(id, { paranoid: false });
    if (!TempCategory) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempCategory.restore();

    // Busca nuevamente el registro para confirmar
    const updatedCategory = await models.Category.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedCategory);
  } catch (error) {
    console.error("❌ Error al recuperar la categoría:", error);
    res.status(500).json({ error: "Error al recuperar la categoría" });
  }
};