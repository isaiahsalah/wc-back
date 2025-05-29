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

export const getProductModels = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id_sector_process, all} = req.query;

    const modelsList = await models.ProductModel.findAll({
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
    res.json(modelsList);
  } catch (error) {
    console.error("❌ Error al obtener los modelos:", error);
    res.status(500).json({error: "Error al obtener los modelos"});
  }
};

export const getProductModelById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const model = await models.ProductModel.findByPk(id);
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

export const createProductModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const newModel = await models.ProductModel.create(req.body);
    res.status(201).json(newModel);
  } catch (error) {
    console.error("❌ Error al crear el modelo:", error);
    res.status(500).json({error: "Error al crear el modelo"});
  }
};

export const updateProductModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempModel = await models.ProductModel.findByPk(id);
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

export const softDeleteProductModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const productModel = await models.ProductModel.findByPk(id);
    if (!productModel) {
      res.status(404).json({error: "Modelo de producto no encontrado"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await productModel.destroy();

    res.status(200).json({message: "Modelo de producto eliminado lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar el modelo de producto lógicamente"});
  }
};

export const hardDeleteProductModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const productModel = await models.ProductModel.findOne({where: {id}, paranoid: false});
    if (!productModel) {
      res.status(404).json({error: "Modelo de producto no encontrado"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await productModel.destroy({force: true});

    res.status(200).json({message: "Modelo de producto eliminado completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar el modelo de producto completamente"});
  }
};

export const recoverProductModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempModel = await models.ProductModel.findByPk(id, {paranoid: false});
    if (!TempModel) {
      res.status(404).json({error: "Modelo no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempModel.restore();

    // Busca nuevamente el registro para confirmar
    const updatedModel = await models.ProductModel.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedModel);
  } catch (error) {
    console.error("❌ Error al recuperar el modelo:", error);
    res.status(500).json({error: "Error al recuperar el modelo"});
  }
};
