import {Request, Response} from "express";
import models, {sequelize} from "../database/models";

// Controlador para Orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await models.Order.findAll({paranoid: false, include: [{model: models.User}]});
    res.json(orders);
  } catch (error) {
    console.error("❌ Error al obtener las órdenes:", error);
    res.status(500).json({error: "Error al obtener las órdenes"});
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await models.Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error("❌ Error al obtener las órdenes:", error);
    res.status(500).json({error: "Error al obtener las órdenes"});
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const order = await models.Order.findByPk(id, {
      include: [
        {model: models.OrderDetail, include: [{model: models.Production}, {model: models.Product}]},
      ],
    });
    if (!order) {
      res.status(404).json({error: "Orden no encontrada"});
      return;
    }
    res.json(order);
  } catch (error) {
    console.error("❌ Error al obtener la orden:", error);
    res.status(500).json({error: "Error al obtener la orden"});
  }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const newOrder = await models.Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Error al crear la orden:", error);
    res.status(500).json({error: "Error al crear la orden"});
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const transaction = await  sequelize.transaction(); // Iniciamos una transacción

  try {
    const {id} = req.params;
    //const dataUpdate = req.body;
    const { order_details, ...orderData } = req.body; 
    console.log("🤣🤣", orderData);
    console.log("😊😊", order_details);


   // 1. Actualizar la orden principal
   const order = await models.Order.findByPk(id, { transaction });
   if (!order) {
     await transaction.rollback();
     res.status(404).json({ error: "Orden no encontrada" });
     return;
   }

   await order.update(orderData, { transaction });

// 2. Manejar los order_details
if (order_details && Array.isArray(order_details)) {
  // Eliminar detalles que no están en el nuevo array
  const existingDetails = await models.OrderDetail.findAll({
    where: { id_order: id },
    transaction
  });


   // IDs de los detalles que vienen en la solicitud (los que queremos mantener)
   const incomingIds = order_details
   .map(detail => detail.id)
   .filter(id => id !== undefined && id !== 0);

 // Detalles a eliminar (los que existen pero no vienen en la solicitud)
 const detailsToRemove = existingDetails.filter(
   detail => order_details.includes(det=>det.id===detail.id)
 );

 // Eliminar los que ya no están
 await models.OrderDetail.destroy({
   where: {
     id: detailsToRemove.map(detail => detail.id),
   },
   transaction
 });



    const TempOrder = await models.Order.findByPk(id);
    if (!TempOrder) {
      res.status(404).json({error: "Orden no encontrada"});
      return;
    }
    console.log(dataUpdate);
    await TempOrder.update(dataUpdate);
    res.json(TempOrder);
  } catch (error) {
    console.error("❌ Error al actualizar la orden:", error);
    res.status(500).json({error: "Error al actualizar la orden"});
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const order = await models.Order.findByPk(id);
    if (!order) {
      res.status(404).json({error: "Orden no encontrada"});
      return;
    }
    await order.destroy();
    res.json({message: "Orden eliminada correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar la orden:", error);
    res.status(500).json({error: "Error al eliminar la orden"});
  }
};

export const recoverOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempOrder = await models.Order.findByPk(id, {paranoid: false});
    if (!TempOrder) {
      res.status(404).json({error: "Orden no encontrada"});
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
    res.status(500).json({error: "Error al recuperar la orden"});
  }
};

/////////////////////////////////////////////////////////////////////

export const createOrderWithDetails = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction(); // Iniciar transacción

  try {
    const {order, orderDetails} = req.body; // Extraer la orden y los detalles de la solicitud

    // Verificar si la orden y los detalles existen
    if (!order || !orderDetails || !Array.isArray(orderDetails)) {
      res.status(400).json({error: "Datos inválidos: se esperaba una orden y detalles"});
      return;
    }

    // Crear la orden dentro de la transacción
    const newOrder = await models.Order.create(order, {transaction});

    // 2. Crear los detalles de la orden (OrderDetails)
    // Asegurarse de asociar el ID de la orden a los detalles
    const orderDetailsWithOrderId = orderDetails.map((detail) => ({
      ...detail,
      id_order: newOrder.get("id"), // Asignar el id de la nueva orden a los detalles
    }));

    // Crear múltiples detalles de la orden
    await models.OrderDetail.bulkCreate(orderDetailsWithOrderId, {
      transaction,
    });

    // 3. Confirmar la transacción
    await transaction.commit();
    res.status(201).json(newOrder); // Devolver la orden creada
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error al crear la orden:", error);
    res.status(500).json({error: "Error al crear la orden"});
  }
};
