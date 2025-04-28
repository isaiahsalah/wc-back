import { Request, Response } from "express";
import models from "../database/models";

export const getLotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lotes = await models.Lote.findAll();
    res.json(lotes);
  } catch (error) {
    console.error("❌ Error al obtener los lotes:", error);
    res.status(500).json({ error: "Error al obtener los lotes" });
  }
};

export const getAllLotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lotes = await models.Lote.findAll({ paranoid: false });
    res.json(lotes);
  } catch (error) {
    console.error("❌ Error al obtener los lotes:", error);
    res.status(500).json({ error: "Error al obtener los lotes" });
  }
};

export const getLoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const lote = await models.Lote.findByPk(id);
    if (!lote) {
      res.status(404).json({ error: "Lote no encontrado" });
      return;
    }
    res.json(lote);
  } catch (error) {
    console.error("❌ Error al obtener el lote:", error);
    res.status(500).json({ error: "Error al obtener el lote" });
  }
};

export const createLote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newLote = await models.Lote.create(req.body);
    res.status(201).json(newLote);
  } catch (error) {
    console.error("❌ Error al crear el lote:", error);
    res.status(500).json({ error: "Error al crear el lote" });
  }
};

export const updateLote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const lote = await models.Lote.findByPk(id);
    if (!lote) {
      res.status(404).json({ error: "Lote no encontrado" });
      return;
    }
    await lote.update(req.body);
    res.json(lote);
  } catch (error) {
    console.error("❌ Error al actualizar el lote:", error);
    res.status(500).json({ error: "Error al actualizar el lote" });
  }
};

export const deleteLote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const lote = await models.Lote.findByPk(id);
    if (!lote) {
      res.status(404).json({ error: "Lote no encontrado" });
      return;
    }
    await lote.destroy();
    res.json({ message: "Lote eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el lote:", error);
    res.status(500).json({ error: "Error al eliminar el lote" });
  }
};


export const recoverLote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempLote = await models.Lote.findByPk(id, { paranoid: false });
    if (!TempLote) {
      res.status(404).json({ error: "Lote no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempLote.restore();
    
    // Busca nuevamente el registro para confirmar
    const updatedLote = await models.Lote.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedLote);

  } catch (error) {
    console.error("❌ Error al recuperar el Lote:", error);
    res.status(500).json({ error: "Error al recuperar el Lote" });
  }
};