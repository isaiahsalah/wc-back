import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Warehouses
export const getAllWarehouses = async (req: Request, res: Response): Promise<void> => {
  try {
    const warehouses = await models.Warehouse.findAll({ paranoid: false });
    res.json(warehouses);
  } catch (error) {
    console.error("❌ Error al obtener los almacenes:", error);
    res.status(500).json({ error: "Error al obtener los almacenes" });
  }
};

export const getWarehouses = async (req: Request, res: Response): Promise<void> => {
  try {
    const warehouses = await models.Warehouse.findAll();
    res.json(warehouses);
  } catch (error) {
    console.error("❌ Error al obtener los almacenes:", error);
    res.status(500).json({ error: "Error al obtener los almacenes" });
  }
};

export const getWarehouseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const warehouse = await models.Warehouse.findByPk(id);
    if (!warehouse) {
      res.status(404).json({ error: "Almacén no encontrado" });
      return;
    }
    res.json(warehouse);
  } catch (error) {
    console.error("❌ Error al obtener el almacén:", error);
    res.status(500).json({ error: "Error al obtener el almacén" });
  }
};

export const createWarehouse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newWarehouse = await models.Warehouse.create(req.body);
    res.status(201).json(newWarehouse);
  } catch (error) {
    console.error("❌ Error al crear el almacén:", error);
    res.status(500).json({ error: "Error al crear el almacén" });
  }
};

export const updateWarehouse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempWarehouse = await models.Warehouse.findByPk(id);
    if (!TempWarehouse) {
      res.status(404).json({ error: "Almacén no encontrado" });
      return;
    }
    console.log(req.body);
    await TempWarehouse.update(req.body);
    res.json(TempWarehouse);
  } catch (error) {
    console.error("❌ Error al actualizar el almacén:", error);
    res.status(500).json({ error: "Error al actualizar el almacén" });
  }
};

export const deleteWarehouse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const warehouse = await models.Warehouse.findByPk(id);
    if (!warehouse) {
      res.status(404).json({ error: "Almacén no encontrado" });
      return;
    }
    await warehouse.destroy();
    res.json({ message: "Almacén eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el almacén:", error);
    res.status(500).json({ error: "Error al eliminar el almacén" });
  }
};

export const recoverWarehouse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempWarehouse = await models.Warehouse.findByPk(id, { paranoid: false });
    if (!TempWarehouse) {
      res.status(404).json({ error: "Almacén no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempWarehouse.restore();

    // Busca nuevamente el registro para confirmar
    const updatedWarehouse = await models.Warehouse.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedWarehouse);
  } catch (error) {
    console.error("❌ Error al recuperar el almacén:", error);
    res.status(500).json({ error: "Error al recuperar el almacén" });
  }
};