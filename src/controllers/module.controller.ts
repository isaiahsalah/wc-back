import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Modules
export const getAllModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const modules = await models.Module.findAll({ paranoid: false });
    res.json(modules);
  } catch (error) {
    console.error("❌ Error al obtener los módulos:", error);
    res.status(500).json({ error: "Error al obtener los módulos" });
  }
};

export const getModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const modules = await models.Module.findAll();
    res.json(modules);
  } catch (error) {
    console.error("❌ Error al obtener los módulos:", error);
    res.status(500).json({ error: "Error al obtener los módulos" });
  }
};

export const getModuleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const module = await models.Module.findByPk(id);
    if (!module) {
      res.status(404).json({ error: "Módulo no encontrado" });
      return;
    }
    res.json(module);
  } catch (error) {
    console.error("❌ Error al obtener el módulo:", error);
    res.status(500).json({ error: "Error al obtener el módulo" });
  }
};

export const createModule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newModule = await models.Module.create(req.body);
    res.status(201).json(newModule);
  } catch (error) {
    console.error("❌ Error al crear el módulo:", error);
    res.status(500).json({ error: "Error al crear el módulo" });
  }
};

export const updateModule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempModule = await models.Module.findByPk(id);
    if (!TempModule) {
      res.status(404).json({ error: "Módulo no encontrado" });
      return;
    }
    console.log(req.body);
    await TempModule.update(req.body);
    res.json(TempModule);
  } catch (error) {
    console.error("❌ Error al actualizar el módulo:", error);
    res.status(500).json({ error: "Error al actualizar el módulo" });
  }
};

export const deleteModule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const module = await models.Module.findByPk(id);
    if (!module) {
      res.status(404).json({ error: "Módulo no encontrado" });
      return;
    }
    await module.destroy();
    res.json({ message: "Módulo eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el módulo:", error);
    res.status(500).json({ error: "Error al eliminar el módulo" });
  }
};

export const recoverModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempModule = await models.Module.findByPk(id, { paranoid: false });
    if (!TempModule) {
      res.status(404).json({ error: "Módulo no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempModule.restore();

    // Busca nuevamente el registro para confirmar
    const updatedModule = await models.Module.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedModule);
  } catch (error) {
    console.error("❌ Error al recuperar el módulo:", error);
    res.status(500).json({ error: "Error al recuperar el módulo" });
  }
};