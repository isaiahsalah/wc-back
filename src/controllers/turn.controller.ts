import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Turnos
export const getTurns = async (req: Request, res: Response) => {
  try {
    const turns = await models.Turn.findAll();
    res.json(turns);
  } catch (error) {
    console.error("❌ Error al obtener los turnos:", error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};

export const getTurnById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const turn = await models.Turn.findByPk(id);
    if (!turn) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }
    res.json(turn);
  } catch (error) {
    console.error("❌ Error al obtener el turno:", error);
    res.status(500).json({ error: "Error al obtener el turno" });
  }
};

export const createTurn = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newTurn = await models.Turn.create({ name, description });
    res.status(201).json(newTurn);
  } catch (error) {
    console.error("❌ Error al crear el turno:", error);
    res.status(500).json({ error: "Error al crear el turno" });
  }
};

export const updateTurn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const turn = await models.Turn.findByPk(id);
    if (!turn) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }
    await turn.update({ name, description });
    res.json(turn);
  } catch (error) {
    console.error("❌ Error al actualizar el turno:", error);
    res.status(500).json({ error: "Error al actualizar el turno" });
  }
};

export const deleteTurn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const turn = await models.Turn.findByPk(id);
    if (!turn) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }
    await turn.destroy();
    res.json({ message: "Turno eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el turno:", error);
    res.status(500).json({ error: "Error al eliminar el turno" });
  }
};

// Puedes replicar este patrón para otras entidades como Sector, Degree, Module, etc.