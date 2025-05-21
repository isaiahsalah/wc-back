import {Request, Response} from "express";
import models from "../database/models";
/*
// Controlador para Processes
export const getAllProcesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const processes = await models.Process.findAll({ paranoid: false });
    res.json(processes);
  } catch (error) {
    console.error("❌ Error al obtener los procesos:", error);
    res.status(500).json({ error: "Error al obtener los procesos" });
  }
};*/

export const getProcesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all} = req.query;

    const processes = await models.Process.findAll({
      paranoid: all ? true : false,
    });
    res.json(processes);
  } catch (error) {
    console.error("❌ Error al obtener los procesos:", error);
    res.status(500).json({error: "Error al obtener los procesos"});
  }
};

export const getProcessById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const process = await models.Process.findByPk(id);
    if (!process) {
      res.status(404).json({error: "Proceso no encontrado"});
      return;
    }
    res.json(process);
  } catch (error) {
    console.error("❌ Error al obtener el proceso:", error);
    res.status(500).json({error: "Error al obtener el proceso"});
  }
};

export const createProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProcess = await models.Process.create(req.body);
    res.status(201).json(newProcess);
  } catch (error) {
    console.error("❌ Error al crear el proceso:", error);
    res.status(500).json({error: "Error al crear el proceso"});
  }
};

export const updateProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempProcess = await models.Process.findByPk(id);
    if (!TempProcess) {
      res.status(404).json({error: "Proceso no encontrado"});
      return;
    }
    console.log(req.body);
    await TempProcess.update(req.body);
    res.json(TempProcess);
  } catch (error) {
    console.error("❌ Error al actualizar el proceso:", error);
    res.status(500).json({error: "Error al actualizar el proceso"});
  }
};

export const deleteProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const process = await models.Process.findByPk(id);
    if (!process) {
      res.status(404).json({error: "Proceso no encontrado"});
      return;
    }
    await process.destroy();
    res.json({message: "Proceso eliminado correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar el proceso:", error);
    res.status(500).json({error: "Error al eliminar el proceso"});
  }
};

export const recoverProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempProcess = await models.Process.findByPk(id, {paranoid: false});
    if (!TempProcess) {
      res.status(404).json({error: "Proceso no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempProcess.restore();

    // Busca nuevamente el registro para confirmar
    const updatedProcess = await models.Process.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedProcess);
  } catch (error) {
    console.error("❌ Error al recuperar el proceso:", error);
    res.status(500).json({error: "Error al recuperar el proceso"});
  }
};
