import { Request, Response } from "express";
import models from "../database/models";

export const getAllInventoryDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventoryDetails = await models.InventoryDetail.findAll({ paranoid: false });
    res.json(inventoryDetails);
  } catch (error) {
    console.error("❌ Error al obtener los detalles de inventario:", error);
    res.status(500).json({ error: "Error al obtener los detalles de inventario" });
  }
};

export const getInventoryDetailById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inventoryDetail = await models.InventoryDetail.findByPk(id);
    if (!inventoryDetail) {
      res.status(404).json({ error: "Detalle de inventario no encontrado" });
      return;
    }
    res.json(inventoryDetail);
  } catch (error) {
    console.error("❌ Error al obtener el detalle de inventario:", error);
    res.status(500).json({ error: "Error al obtener el detalle de inventario" });
  }
};

export const createInventoryDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const newInventoryDetail = await models.InventoryDetail.create(req.body);
    res.status(201).json(newInventoryDetail);
  } catch (error) {
    console.error("❌ Error al crear el detalle de inventario:", error);
    res.status(500).json({ error: "Error al crear el detalle de inventario" });
  }
};

export const updateInventoryDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inventoryDetail = await models.InventoryDetail.findByPk(id);
    if (!inventoryDetail) {
      res.status(404).json({ error: "Detalle de inventario no encontrado" });
      return;
    }
    await inventoryDetail.update(req.body);
    res.json(inventoryDetail);
  } catch (error) {
    console.error("❌ Error al actualizar el detalle de inventario:", error);
    res.status(500).json({ error: "Error al actualizar el detalle de inventario" });
  }
};

export const deleteInventoryDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inventoryDetail = await models.InventoryDetail.findByPk(id);
    if (!inventoryDetail) {
      res.status(404).json({ error: "Detalle de inventario no encontrado" });
      return;
    }
    await inventoryDetail.destroy();
    res.json({ message: "Detalle de inventario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el detalle de inventario:", error);
    res.status(500).json({ error: "Error al eliminar el detalle de inventario" });
  }
};