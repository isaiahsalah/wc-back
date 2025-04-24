import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Degrees
export const getAllDegrees = async (req: Request, res: Response): Promise<void> => {
  try {
    const degrees = await models.Degree.findAll({ paranoid: false });
    res.json(degrees);
  } catch (error) {
    console.error("❌ Error al obtener los grados:", error);
    res.status(500).json({ error: "Error al obtener los grados" });
  }
};

export const getDegrees = async (req: Request, res: Response): Promise<void> => {
  try {
    const degrees = await models.Degree.findAll();
    res.json(degrees);
  } catch (error) {
    console.error("❌ Error al obtener los grados:", error);
    res.status(500).json({ error: "Error al obtener los grados" });
  }
};

export const getDegreeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const degree = await models.Degree.findByPk(id);
    if (!degree) {
      res.status(404).json({ error: "Grado no encontrado" });
      return;
    }
    res.json(degree);
  } catch (error) {
    console.error("❌ Error al obtener el grado:", error);
    res.status(500).json({ error: "Error al obtener el grado" });
  }
};

export const createDegree = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newDegree = await models.Degree.create(req.body);
    res.status(201).json(newDegree);
  } catch (error) {
    console.error("❌ Error al crear el grado:", error);
    res.status(500).json({ error: "Error al crear el grado" });
  }
};

export const updateDegree = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempDegree = await models.Degree.findByPk(id);
    if (!TempDegree) {
      res.status(404).json({ error: "Grado no encontrado" });
      return;
    }
    console.log(req.body);
    await TempDegree.update(req.body);
    res.json(TempDegree);
  } catch (error) {
    console.error("❌ Error al actualizar el grado:", error);
    res.status(500).json({ error: "Error al actualizar el grado" });
  }
};

export const deleteDegree = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const degree = await models.Degree.findByPk(id);
    if (!degree) {
      res.status(404).json({ error: "Grado no encontrado" });
      return;
    }
    await degree.destroy();
    res.json({ message: "Grado eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el grado:", error);
    res.status(500).json({ error: "Error al eliminar el grado" });
  }
};

export const recoverDegree = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempDegree = await models.Degree.findByPk(id, { paranoid: false });
    if (!TempDegree) {
      res.status(404).json({ error: "Grado no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempDegree.restore();

    // Busca nuevamente el registro para confirmar
    const updatedDegree = await models.Degree.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedDegree);
  } catch (error) {
    console.error("❌ Error al recuperar el grado:", error);
    res.status(500).json({ error: "Error al recuperar el grado" });
  }
};