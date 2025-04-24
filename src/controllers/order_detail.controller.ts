import { Request, Response } from "express";
import models from "../database/models";

// Controlador para OrderDetails
export const getAllOrderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderDetails = await models.OrderDetail.findAll({ paranoid: false });
    res.json(orderDetails);
  } catch (error) {
    console.error("❌ Error al obtener los detalles de las órdenes:", error);
    res.status(500).json({ error: "Error al obtener los detalles de las órdenes" });
  }
};

export const getOrderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderDetails = await models.OrderDetail.findAll();
    res.json(orderDetails);
  } catch (error) {
    console.error("❌ Error al obtener los detalles de las órdenes:", error);
    res.status(500).json({ error: "Error al obtener los detalles de las órdenes" });
  }
};

export const getOrderDetailById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const orderDetail = await models.OrderDetail.findByPk(id);
    if (!orderDetail) {
      res.status(404).json({ error: "Detalle de la orden no encontrado" });
      return;
    }
    res.json(orderDetail);
  } catch (error) {
    console.error("❌ Error al obtener el detalle de la orden:", error);
    res.status(500).json({ error: "Error al obtener el detalle de la orden" });
  }
};

export const createOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newOrderDetail = await models.OrderDetail.create(req.body);
    res.status(201).json(newOrderDetail);
  } catch (error) {
    console.error("❌ Error al crear el detalle de la orden:", error);
    res.status(500).json({ error: "Error al crear el detalle de la orden" });
  }
};

export const updateOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const TempOrderDetail = await models.OrderDetail.findByPk(id);
    if (!TempOrderDetail) {
      res.status(404).json({ error: "Detalle de la orden no encontrado" });
      return;
    }
    console.log(req.body);
    await TempOrderDetail.update(req.body);
    res.json(TempOrderDetail);
  } catch (error) {
    console.error("❌ Error al actualizar el detalle de la orden:", error);
    res.status(500).json({ error: "Error al actualizar el detalle de la orden" });
  }
};

export const deleteOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const orderDetail = await models.OrderDetail.findByPk(id);
    if (!orderDetail) {
      res.status(404).json({ error: "Detalle de la orden no encontrado" });
      return;
    }
    await orderDetail.destroy();
    res.json({ message: "Detalle de la orden eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el detalle de la orden:", error);
    res.status(500).json({ error: "Error al eliminar el detalle de la orden" });
  }
};

export const recoverOrderDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempOrderDetail = await models.OrderDetail.findByPk(id, { paranoid: false });
    if (!TempOrderDetail) {
      res.status(404).json({ error: "Detalle de la orden no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempOrderDetail.restore();

    // Busca nuevamente el registro para confirmar
    const updatedOrderDetail = await models.OrderDetail.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedOrderDetail);
  } catch (error) {
    console.error("❌ Error al recuperar el detalle de la orden:", error);
    res.status(500).json({ error: "Error al recuperar el detalle de la orden" });
  }
};