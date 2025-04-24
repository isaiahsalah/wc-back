import { Request, Response } from "express";
import models from "../database/models";

// Controlador para States
export const getAllStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const states = await models.State.findAll({ paranoid: false });
    res.json(states);
  } catch (error) {
    console.error("❌ Error al obtener los estados:", error);
    res.status(500).json({ error: "Error al obtener los estados" });
  }
};

export const getStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const states = await models.State.findAll();
    res.json(states);
  } catch (error) {
    console.error("❌ Error al obtener los estados:", error);
    res.status(500).json({ error: "Error al obtener los estados" });
  }
};

export const getStateById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const state = await models.State.findByPk(id);
    if (!state) {
      res.status(404).json({ error: "Estado no encontrado" });
      return;
    }
    res.json(state);
  } catch (error) {
    console.error("❌ Error al obtener el estado:", error);
    res.status(500).json({ error: "Error al obtener el estado" });
  }
};

export const createState = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newState = await models.State.create(req.body);
    res.status(201).json(newState);
  } catch (error) {
    console.error("❌ Error al crear el estado:", error);
    res.status(500).json({ error: "Error al crear el estado" });
  }
};

export const updateState = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempState = await models.State.findByPk(id);
    if (!TempState) {
      res.status(404).json({ error: "Estado no encontrado" });
      return;
    }
    console.log(req.body);
    await TempState.update(req.body);
    res.json(TempState);
  } catch (error) {
    console.error("❌ Error al actualizar el estado:", error);
    res.status(500).json({ error: "Error al actualizar el estado" });
  }
};

export const deleteState = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const state = await models.State.findByPk(id);
    if (!state) {
      res.status(404).json({ error: "Estado no encontrado" });
      return;
    }
    await state.destroy();
    res.json({ message: "Estado eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el estado:", error);
    res.status(500).json({ error: "Error al eliminar el estado" });
  }
};

export const recoverState = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempState = await models.State.findByPk(id, { paranoid: false });
    if (!TempState) {
      res.status(404).json({ error: "Estado no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempState.restore();

    // Busca nuevamente el registro para confirmar
    const updatedState = await models.State.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedState);
  } catch (error) {
    console.error("❌ Error al recuperar el estado:", error);
    res.status(500).json({ error: "Error al recuperar el estado" });
  }
};