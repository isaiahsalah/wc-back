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

export const softDeleteMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const machine = await models.Machine.findByPk(id);
    if (!machine) {
      res.status(404).json({error: "Máquina no encontrada"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await machine.destroy();

    res.status(200).json({message: "Máquina eliminada lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar la máquina lógicamente"});
  }
};

export const hardDeleteMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const machine = await models.Machine.findOne({where: {id}, paranoid: false});
    if (!machine) {
      res.status(404).json({error: "Máquina no encontrada"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await machine.destroy({force: true});

    res.status(200).json({message: "Máquina eliminada completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar la máquina completamente"});
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
