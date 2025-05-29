import {Request, Response} from "express";
import models from "../database/models";
import {Op} from "sequelize";

export const getSectorProcesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all, id_sector} = req.query;

    const sectors = await models.SectorProcess.findAll({
      paranoid: all ? false : true,
      include: [{model: models.Process}, {model: models.Sector}],
      where: {
        id_sector: id_sector ? id_sector : {[Op.ne]: null},
      },
    });
    console.log("🚩🚩Sectors:", JSON.stringify({id_sector}, null, 2));
    res.json(sectors);
  } catch (error) {
    console.error("❌ Error al obtener los procesos del sector:", error);
    res.status(500).json({error: "Error al obtener los procesos del sector"});
  }
};

export const getSectorProcessById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const sector = await models.SectorProcess.findByPk(id);
    if (!sector) {
      res.status(404).json({error: "proceso del Sector no encontrado"});
      return;
    }
    res.json(sector);
  } catch (error) {
    console.error("❌ Error al obtener el proceso del sector:", error);
    res.status(500).json({error: "Error al obtener el proceso del sector"});
  }
};

export const createSectorProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSector = await models.SectorProcess.create(req.body);
    res.status(201).json(newSector);
  } catch (error) {
    console.error("❌ Error al crear el proceso del sector:", error);
    res.status(500).json({error: "Error al crear el proceso del sector"});
  }
};

export const updateSectorProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempSector = await models.SectorProcess.findByPk(id);
    if (!TempSector) {
      res.status(404).json({error: "proceso del Sector no encontrado"});
      return;
    }
    console.log(req.body);
    await TempSector.update(req.body);
    res.json(TempSector);
  } catch (error) {
    console.error("❌ Error al actualizar el proceso del sector:", error);
    res.status(500).json({error: "Error al actualizar el proceso del sector"});
  }
};

export const softDeleteSectorProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const sectorProcess = await models.SectorProcess.findByPk(id);
    if (!sectorProcess) {
      res.status(404).json({error: "Proceso del sector no encontrado"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await sectorProcess.destroy();

    res.status(200).json({message: "Proceso del sector eliminado lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar el proceso del sector lógicamente"});
  }
};

export const hardDeleteSectorProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const sectorProcess = await models.SectorProcess.findOne({where: {id}, paranoid: false});
    if (!sectorProcess) {
      res.status(404).json({error: "Proceso del sector no encontrado"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await sectorProcess.destroy({force: true});

    res.status(200).json({message: "Proceso del sector eliminado completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar el proceso del sector completamente"});
  }
};

export const recoverSectorProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempSector = await models.SectorProcess.findByPk(id, {paranoid: false});
    if (!TempSector) {
      res.status(404).json({error: "proceso del Sector no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempSector.restore();

    // Busca nuevamente el registro para confirmar
    const updatedSector = await models.SectorProcess.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedSector);
  } catch (error) {
    console.error("❌ Error al recuperar el proceso del sector:", error);
    res.status(500).json({error: "Error al recuperar el proceso del sector"});
  }
};
