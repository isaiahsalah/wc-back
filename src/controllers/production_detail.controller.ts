import {Request, Response} from "express";
import models from "../database/models";

export const getProductionDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all} = req.query;

    const productionDetails = await models.ProductionCost.findAll({
      paranoid: all ? false : true,
    });
    res.json(productionDetails);
  } catch (error) {
    console.error("❌ Error al obtener los detalles de producción:", error);
    res.status(500).json({error: "Error al obtener los detalles de producción"});
  }
};

export const getProductionDetailById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const productionDetail = await models.ProductionCost.findByPk(id);
    if (!productionDetail) {
      res.status(404).json({error: "Detalle de producción no encontrado"});
      return;
    }
    res.json(productionDetail);
  } catch (error) {
    console.error("❌ Error al obtener el detalle de producción:", error);
    res.status(500).json({error: "Error al obtener el detalle de producción"});
  }
};

export const createProductionDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProductionDetail = await models.ProductionCost.create(req.body);
    res.status(201).json(newProductionDetail);
  } catch (error) {
    console.error("❌ Error al crear el detalle de producción:", error);
    res.status(500).json({error: "Error al crear el detalle de producción"});
  }
};

export const updateProductionDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const productionDetail = await models.ProductionCost.findByPk(id);
    if (!productionDetail) {
      res.status(404).json({error: "Detalle de producción no encontrado"});
      return;
    }
    await productionDetail.update(req.body);
    res.json(productionDetail);
  } catch (error) {
    console.error("❌ Error al actualizar el detalle de producción:", error);
    res.status(500).json({error: "Error al actualizar el detalle de producción"});
  }
};

export const deleteProductionDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const productionDetail = await models.ProductionCost.findByPk(id);
    if (!productionDetail) {
      res.status(404).json({error: "Detalle de producción no encontrado"});
      return;
    }
    await productionDetail.destroy();
    res.json({message: "Detalle de producción eliminado correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar el detalle de producción:", error);
    res.status(500).json({error: "Error al eliminar el detalle de producción"});
  }
};

export const recoverProductionDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempProductionDetail = await models.ProductionCost.findByPk(id, {paranoid: false});
    if (!TempProductionDetail) {
      res.status(404).json({error: "ProductionDetail no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempProductionDetail.restore();

    // Busca nuevamente el registro para confirmar
    const updatedProductionDetail = await models.ProductionCost.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedProductionDetail);
  } catch (error) {
    console.error("❌ Error al recuperar el ProductionDetail:", error);
    res.status(500).json({error: "Error al recuperar el ProductionDetail"});
  }
};
