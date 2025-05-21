import {Request, Response} from "express";
import models from "../database/models";
import {Op} from "sequelize";
/*
// Controlador para Models
export const getAllModels = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id_sector} = req.query;

    const modelsList = await models.Model.findAll({
      paranoid: false,
      where: {
        id_sector: id_sector ? id_sector : {[Op.ne]: null},
      },
      include: [{model: models.Process}, {model: models.Sector}],
    });
    res.json(modelsList);
  } catch (error) {
    console.error("❌ Error al obtener los modelos:", error);
    res.status(500).json({error: "Error al obtener los modelos"});
  }
};*/

export const getModels = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id_sector, all} = req.query;

    const modelsList = await models.Model.findAll({
      paranoid: all ? true : false,

      where: {
        id_sector: id_sector ? id_sector : {[Op.ne]: null},
      },
      include: [{model: models.Process}, {model: models.Sector}],
    });
    res.json(modelsList);
  } catch (error) {
    console.error("❌ Error al obtener los modelos:", error);
    res.status(500).json({error: "Error al obtener los modelos"});
  }
};

export const getModelById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const model = await models.Model.findByPk(id);
    if (!model) {
      res.status(404).json({error: "Modelo no encontrado"});
      return;
    }
    res.json(model);
  } catch (error) {
    console.error("❌ Error al obtener el modelo:", error);
    res.status(500).json({error: "Error al obtener el modelo"});
  }
};

export const createModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const newModel = await models.Model.create(req.body);
    res.status(201).json(newModel);
  } catch (error) {
    console.error("❌ Error al crear el modelo:", error);
    res.status(500).json({error: "Error al crear el modelo"});
  }
};

export const updateModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempModel = await models.Model.findByPk(id);
    if (!TempModel) {
      res.status(404).json({error: "Modelo no encontrado"});
      return;
    }
    console.log(req.body);
    await TempModel.update(req.body);
    res.json(TempModel);
  } catch (error) {
    console.error("❌ Error al actualizar el modelo:", error);
    res.status(500).json({error: "Error al actualizar el modelo"});
  }
};

export const deleteModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const model = await models.Model.findByPk(id);
    if (!model) {
      res.status(404).json({error: "Modelo no encontrado"});
      return;
    }
    await model.destroy();
    res.json({message: "Modelo eliminado correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar el modelo:", error);
    res.status(500).json({error: "Error al eliminar el modelo"});
  }
};

export const recoverModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempModel = await models.Model.findByPk(id, {paranoid: false});
    if (!TempModel) {
      res.status(404).json({error: "Modelo no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempModel.restore();

    // Busca nuevamente el registro para confirmar
    const updatedModel = await models.Model.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedModel);
  } catch (error) {
    console.error("❌ Error al recuperar el modelo:", error);
    res.status(500).json({error: "Error al recuperar el modelo"});
  }
};
