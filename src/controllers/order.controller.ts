import { Request, Response } from "express";
import models from "../database/models";

// Controlador para Orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await models.Order.findAll({ paranoid: false });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error al obtener las órdenes:", error);
    res.status(500).json({ error: "Error al obtener las órdenes" });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await models.Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error("❌ Error al obtener las órdenes:", error);
    res.status(500).json({ error: "Error al obtener las órdenes" });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await models.Order.findByPk(id);
    if (!order) {
      res.status(404).json({ error: "Orden no encontrada" });
      return;
    }
    res.json(order);
  } catch (error) {
    console.error("❌ Error al obtener la orden:", error);
    res.status(500).json({ error: "Error al obtener la orden" });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newOrder = await models.Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Error al crear la orden:", error);
    res.status(500).json({ error: "Error al crear la orden" });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempOrder = await models.Order.findByPk(id);
    if (!TempOrder) {
      res.status(404).json({ error: "Orden no encontrada" });
      return;
    }
    console.log(req.body);
    await TempOrder.update(req.body);
    res.json(TempOrder);
  } catch (error) {
    console.error("❌ Error al actualizar la orden:", error);
    res.status(500).json({ error: "Error al actualizar la orden" });
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await models.Order.findByPk(id);
    if (!order) {
      res.status(404).json({ error: "Orden no encontrada" });
      return;
    }
    await order.destroy();
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar la orden:", error);
    res.status(500).json({ error: "Error al eliminar la orden" });
  }
};

export const recoverOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempOrder = await models.Order.findByPk(id, { paranoid: false });
    if (!TempOrder) {
      res.status(404).json({ error: "Orden no encontrada" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempOrder.restore();

    // Busca nuevamente el registro para confirmar
    const updatedOrder = await models.Order.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedOrder);
  } catch (error) {
    console.error("❌ Error al recuperar la orden:", error);
    res.status(500).json({ error: "Error al recuperar la orden" });
  }
};