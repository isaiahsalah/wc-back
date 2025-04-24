import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Sectors
export const getAllSectors = async (req: Request, res: Response): Promise<void> => {
  try {
    const sectors = await models.Sector.findAll({ paranoid: false });
    res.json(sectors);
  } catch (error) {
    console.error("❌ Error al obtener los sectores:", error);
    res.status(500).json({ error: "Error al obtener los sectores" });
  }
};

export const getSectors = async (req: Request, res: Response): Promise<void> => {
  try {
    const sectors = await models.Sector.findAll();
    res.json(sectors);
  } catch (error) {
    console.error("❌ Error al obtener los sectores:", error);
    res.status(500).json({ error: "Error al obtener los sectores" });
  }
};

export const getSectorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const sector = await models.Sector.findByPk(id);
    if (!sector) {
      res.status(404).json({ error: "Sector no encontrado" });
      return;
    }
    res.json(sector);
  } catch (error) {
    console.error("❌ Error al obtener el sector:", error);
    res.status(500).json({ error: "Error al obtener el sector" });
  }
};

export const createSector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newSector = await models.Sector.create(req.body);
    res.status(201).json(newSector);
  } catch (error) {
    console.error("❌ Error al crear el sector:", error);
    res.status(500).json({ error: "Error al crear el sector" });
  }
};

export const updateSector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempSector = await models.Sector.findByPk(id);
    if (!TempSector) {
      res.status(404).json({ error: "Sector no encontrado" });
      return;
    }
    console.log(req.body);
    await TempSector.update(req.body);
    res.json(TempSector);
  } catch (error) {
    console.error("❌ Error al actualizar el sector:", error);
    res.status(500).json({ error: "Error al actualizar el sector" });
  }
};

export const deleteSector = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const sector = await models.Sector.findByPk(id);
    if (!sector) {
      res.status(404).json({ error: "Sector no encontrado" });
      return;
    }
    await sector.destroy();
    res.json({ message: "Sector eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el sector:", error);
    res.status(500).json({ error: "Error al eliminar el sector" });
  }
};

export const recoverSector = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempSector = await models.Sector.findByPk(id, { paranoid: false });
    if (!TempSector) {
      res.status(404).json({ error: "Sector no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempSector.restore();

    // Busca nuevamente el registro para confirmar
    const updatedSector = await models.Sector.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedSector);
  } catch (error) {
    console.error("❌ Error al recuperar el sector:", error);
    res.status(500).json({ error: "Error al recuperar el sector" });
  }
};