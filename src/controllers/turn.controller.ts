import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Turnos
export const getAllTurns = async (req: Request, res: Response): Promise<void> => {
  try {
    const turns = await models.Turn.findAll({ paranoid: false });
    res.json(turns);
  } catch (error) {
    console.error("❌ Error al obtener los turnos:", error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};

export const getTurns = async (req: Request, res: Response): Promise<void> => {
  try {
    const turns = await models.Turn.findAll();
    res.json(turns);
  } catch (error) {
    console.error("❌ Error al obtener los turnos:", error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};

export const getTurnById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const turn = await models.Turn.findByPk(id);
    if (!turn) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }
    res.json(turn);
  } catch (error) {
    console.error("❌ Error al obtener el turno:", error);
    res.status(500).json({ error: "Error al obtener el turno" });
  }
};

export const createTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTurn = await models.Turn.create(req.body);
    res.status(201).json(newTurn);
  } catch (error) {
    console.error("❌ Error al crear el turno:", error);
    res.status(500).json({ error: "Error al crear el turno" });
  }
};

export const updateTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempTurn = await models.Turn.findByPk(id);
    if (!TempTurn) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }
    console.log(req.body);
    await TempTurn.update(req.body);
    res.json(TempTurn);
  } catch (error) {
    console.error("❌ Error al actualizar el turno:", error);
    res.status(500).json({ error: "Error al actualizar el turno" });
  }
};

export const deleteTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const turn = await models.Turn.findByPk(id);
    if (!turn) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }
    await turn.destroy();
    res.json({ message: "Turno eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el turno:", error);
    res.status(500).json({ error: "Error al eliminar el turno" });
  }
};

export const recoverTurn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempTurn = await models.Turn.findByPk(id, { paranoid: false });
    if (!TempTurn) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempTurn.restore();

    // Busca nuevamente el registro para confirmar
    const updatedTurn = await models.Turn.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedTurn);
  } catch (error) {
    console.error("❌ Error al recuperar el turno:", error);
    res.status(500).json({ error: "Error al recuperar el turno" });
  }
};