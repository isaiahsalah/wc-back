import {Request, Response} from "express";
import models from "../database/models";
import {Op} from "sequelize";
/*
// Controlador para Machines
export const getAllMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await models.Machine.findAll({
      paranoid: false,
      include: [{model: models.Process}],
    });
    res.json(machines);
  } catch (error) {
    console.error("❌ Error al obtener las máquinas:", error);
    res.status(500).json({error: "Error al obtener las máquinas"});
  }
};
*/
export const getMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id_sector_process, all} = req.query;

    const machines = await models.Machine.findAll({
      paranoid: all ? false : true,
      include: [
        {
          model: models.SectorProcess,
          include: [{model: models.Sector}, {model: models.Process}],
        },
      ],
      where: {
        id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
      },
    });
    res.json(machines);
  } catch (error) {
    console.error("❌ Error al obtener las máquinas:", error);
    res.status(500).json({error: "Error al obtener las máquinas"});
  }
};

export const getMachineById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const machine = await models.Machine.findByPk(id);
    if (!machine) {
      res.status(404).json({error: "Máquina no encontrada"});
      return;
    }
    res.json(machine);
  } catch (error) {
    console.error("❌ Error al obtener la máquina:", error);
    res.status(500).json({error: "Error al obtener la máquina"});
  }
};

export const createMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const newMachine = await models.Machine.create(req.body);
    res.status(201).json(newMachine);
  } catch (error) {
    console.error("❌ Error al crear la máquina:", error);
    res.status(500).json({error: "Error al crear la máquina"});
  }
};

export const updateMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempMachine = await models.Machine.findByPk(id);
    if (!TempMachine) {
      res.status(404).json({error: "Máquina no encontrada"});
      return;
    }
    console.log(req.body);
    await TempMachine.update(req.body);
    res.json(TempMachine);
  } catch (error) {
    console.error("❌ Error al actualizar la máquina:", error);
    res.status(500).json({error: "Error al actualizar la máquina"});
  }
};

export const deleteMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const machine = await models.Machine.findByPk(id);
    if (!machine) {
      res.status(404).json({error: "Máquina no encontrada"});
      return;
    }
    await machine.destroy();
    res.json({message: "Máquina eliminada correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar la máquina:", error);
    res.status(500).json({error: "Error al eliminar la máquina"});
  }
};

export const recoverMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempMachine = await models.Machine.findByPk(id, {paranoid: false});
    if (!TempMachine) {
      res.status(404).json({error: "Máquina no encontrada"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempMachine.restore();

    // Busca nuevamente el registro para confirmar
    const updatedMachine = await models.Machine.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedMachine);
  } catch (error) {
    console.error("❌ Error al recuperar la máquina:", error);
    res.status(500).json({error: "Error al recuperar la máquina"});
  }
};
