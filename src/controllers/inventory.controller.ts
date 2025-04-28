import { Request, Response } from "express";
import models from "../database/models";

export const getInventories = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventories = await models.Inventory.findAll();
    res.json(inventories);
  } catch (error) {
    console.error("❌ Error al obtener los inventarios:", error);
    res.status(500).json({ error: "Error al obtener los inventarios" });
  }
};

export const getAllInventories = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventories = await models.Inventory.findAll({ paranoid: false });
    res.json(inventories);
  } catch (error) {
    console.error("❌ Error al obtener los inventarios:", error);
    res.status(500).json({ error: "Error al obtener los inventarios" });
  }
};

export const getInventoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inventory = await models.Inventory.findByPk(id);
    if (!inventory) {
      res.status(404).json({ error: "Inventario no encontrado" });
      return;
    }
    res.json(inventory);
  } catch (error) {
    console.error("❌ Error al obtener el inventario:", error);
    res.status(500).json({ error: "Error al obtener el inventario" });
  }
};

export const createInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const newInventory = await models.Inventory.create(req.body);
    res.status(201).json(newInventory);
  } catch (error) {
    console.error("❌ Error al crear el inventario:", error);
    res.status(500).json({ error: "Error al crear el inventario" });
  }
};

export const updateInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inventory = await models.Inventory.findByPk(id);
    if (!inventory) {
      res.status(404).json({ error: "Inventario no encontrado" });
      return;
    }
    await inventory.update(req.body);
    res.json(inventory);
  } catch (error) {
    console.error("❌ Error al actualizar el inventario:", error);
    res.status(500).json({ error: "Error al actualizar el inventario" });
  }
};

export const deleteInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const inventory = await models.Inventory.findByPk(id);
    if (!inventory) {
      res.status(404).json({ error: "Inventario no encontrado" });
      return;
    }
    await inventory.destroy();
    res.json({ message: "Inventario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el inventario:", error);
    res.status(500).json({ error: "Error al eliminar el inventario" });
  }
};


export const recoverInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempInventory = await models.Inventory.findByPk(id, { paranoid: false });
    if (!TempInventory) {
      res.status(404).json({ error: "Inventory no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempInventory.restore();
    
    // Busca nuevamente el registro para confirmar
    const updatedInventory = await models.Inventory.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedInventory);

  } catch (error) {
    console.error("❌ Error al recuperar el Inventory:", error);
    res.status(500).json({ error: "Error al recuperar el Inventory" });
  }
};