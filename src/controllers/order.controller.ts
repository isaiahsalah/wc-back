import {Request, Response} from "express";
import models, {sequelize} from "../database/models";
import {Op} from "sequelize";

export const getProductionOrders = async (req: Request, res: Response): Promise<void> => {
  const {id_sector_process, all} = req.query;

  try {
    const orders = await models.ProductionOrder.findAll({
      paranoid: all ? false : true,
      include: [
        {model: models.SysUser},
        {model: models.WorkGroup},
        {
          model: models.ProductionOrderDetail,
          required: true,
          include: [
            {
              model: models.Product,
              required: true,
              include: [
                {
                  model: models.ProductModel,
                  required: true,
                  where: {
                    id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
                  },
                },
              ],
            },
            {model: models.Machine},
          ],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error al obtener las órdenes:", error);
    res.status(500).json({error: "Error al obtener las órdenes"});
  }
};

export const getProductionOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const order = await models.ProductionOrder.findByPk(id, {
      include: [
        {
          model: models.ProductionOrderDetail,
          include: [{model: models.Production}, {model: models.Product}, {model: models.Machine}],
        },
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

export const createProductionOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const newOrder = await models.ProductionOrder.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Error al crear la orden:", error);
    res.status(500).json({error: "Error al crear la orden"});
  }
};

export const updateProductionOrder = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction(); // Iniciamos una transacción

  try {
    const {id} = req.params;
    //const dataUpdate = req.body;
    const orderData = req.body;

    // 1. Actualizar la orden principal
    const order = await models.ProductionOrder.findByPk(id, {transaction});
    if (!order) {
      await transaction.rollback();
      res.status(404).json({error: "Orden no encontrada"});
      return;
    }

    await order.update(orderData, {transaction});

    // 2. Manejar los order_details
    if (orderData.production_order_details && Array.isArray(orderData.production_order_details)) {
      // Eliminar detalles que no están en el nuevo array
      const existingDetails = await models.ProductionOrderDetail.findAll({
        where: {id_production_order: id},
        transaction,
      });

      // Detalles a eliminar (los que existen pero no vienen en la solicitud)
      const existingDetailsTemp = new Set(
        orderData.production_order_details.map((elemento: {id: any}) => elemento.id)
      );

      const detailsToRemove = existingDetails.filter(
        (detail: any) => !existingDetailsTemp.has(detail.id)
      );

      // Eliminar los que ya no están
      await models.ProductionOrderDetail.destroy({
        where: {
          id: detailsToRemove.map((detail: any) => detail.id),
        },
        transaction,
      });

      // Actualizar/Crear los detalles
      for (const detailData of orderData.production_order_details) {
        if (detailData.id) {
          // Actualizar detalle existente
          const detail = await models.ProductionOrderDetail.findByPk(detailData.id, {transaction});
          if (detail) {
            await detail.update(detailData, {transaction});
          }
        } else {
          // Crear nuevo detalle
          await models.ProductionOrderDetail.create(
            {
              ...detailData,
              id_production_order: id, // Asegurar que pertenece a esta orden
            },
            {transaction}
          );
        }
      }
    }

    await transaction.commit(); // Confirmar todos los cambios

    // Obtener la orden actualizada con sus detalles para la respuesta
    const updatedOrder = await models.ProductionOrder.findByPk(id, {
      include: [
        {
          model: models.ProductionOrderDetail,
          include: [models.Product], // Incluir información del producto si es necesario
        },
      ],
    });

    res.json(updatedOrder);
    /*
    const TempOrder = await models.ProductionOrder.findByPk(id);
    if (!TempOrder) {
      res.status(404).json({error: "Orden no encontrada"});
      return;
    }
    console.log(dataUpdate);
    await TempOrder.update(dataUpdate);
    res.json(TempOrder);*/
  } catch (error) {
    console.error("❌ Error al actualizar la orden:", error);
    res.status(500).json({error: "Error al actualizar la orden"});
  }
};

export const softDeleteProductionOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const productionOrder = await models.ProductionOrder.findByPk(id);
    if (!productionOrder) {
      res.status(404).json({error: "Orden de producción no encontrada"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await productionOrder.destroy();

    res.status(200).json({message: "Orden de producción eliminada lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar la orden de producción lógicamente"});
  }
};

export const hardDeleteProductionOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const productionOrder = await models.ProductionOrder.findOne({where: {id}, paranoid: false});
    if (!productionOrder) {
      res.status(404).json({error: "Orden de producción no encontrada"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await productionOrder.destroy({force: true});

    res.status(200).json({message: "Orden de producción eliminada completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar la orden de producción completamente"});
  }
};

export const recoverProductionOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempOrder = await models.ProductionOrder.findByPk(id, {paranoid: false});
    if (!TempOrder) {
      res.status(404).json({error: "Orden no encontrada"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempOrder.restore();

    // Busca nuevamente el registro para confirmar
    const updatedOrder = await models.ProductionOrder.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedOrder);
  } catch (error) {
    console.error("❌ Error al recuperar la orden:", error);
    res.status(500).json({error: "Error al recuperar la orden"});
  }
};

/////////////////////////////////////////////////////////////////////

export const createProductionOrderWithDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await sequelize.transaction(); // Iniciar transacción

  try {
    const {order, orderDetails} = req.body; // Extraer la orden y los detalles de la solicitud

    // Verificar si la orden y los detalles existen
    if (!order || !orderDetails || !Array.isArray(orderDetails)) {
      res.status(400).json({error: "Datos inválidos: se esperaba una orden y detalles"});
      return;
    }

    // Crear la orden dentro de la transacción
    const newOrder = await models.ProductionOrder.create(order, {transaction});

    // 2. Crear los detalles de la orden (OrderDetails)
    // Asegurarse de asociar el ID de la orden a los detalles
    const orderDetailsWithOrderId = orderDetails.map((detail) => ({
      ...detail,
      id_production_order: newOrder.get("id"), // Asignar el id de la nueva orden a los detalles
    }));

    // Crear múltiples detalles de la orden
    await models.ProductionOrderDetail.bulkCreate(orderDetailsWithOrderId, {
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

export const editProductionOrderWithDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("🅿️🅿️🅿️");

  const transaction = await sequelize.transaction(); // Iniciamos una transacción

  try {
    const {id} = req.params;
    //const dataUpdate = req.body;
    const {order_details, ...orderData} = req.body;

    // 1. Actualizar la orden principal
    const order = await models.ProductionOrder.findByPk(id, {transaction});
    if (!order) {
      await transaction.rollback();
      res.status(404).json({error: "Orden no encontrada"});
      return;
    }

    await order.update(orderData, {transaction});

    // 2. Manejar los order_details
    if (order_details && Array.isArray(order_details)) {
      // Eliminar detalles que no están en el nuevo array
      const existingDetails = await models.ProductionOrderDetail.findAll({
        where: {id_production_order: id},
        transaction,
      });

      // Detalles a eliminar (los que existen pero no vienen en la solicitud)
      const existingDetailsTemp = new Set(order_details.map((elemento) => elemento.id));

      const detailsToRemove = existingDetails.filter(
        (detail: any) => !existingDetailsTemp.has(detail.id)
      );

      // Eliminar los que ya no están
      await models.ProductionOrderDetail.destroy({
        where: {
          id: detailsToRemove.map((detail: any) => detail.id),
        },
        transaction,
      });

      // Actualizar/Crear los detalles
      for (const detailData of order_details) {
        if (detailData.id) {
          // Actualizar detalle existente
          const detail = await models.ProductionOrderDetail.findByPk(detailData.id, {transaction});
          if (detail) {
            await detail.update(detailData, {transaction});
          }
        } else {
          // Crear nuevo detalle
          await models.ProductionOrderDetail.create(
            {
              ...detailData,
              id_production_order: id, // Asegurar que pertenece a esta orden
            },
            {transaction}
          );
        }
      }
    }

    await transaction.commit(); // Confirmar todos los cambios

    // Obtener la orden actualizada con sus detalles para la respuesta
    const updatedOrder = await models.ProductionOrder.findByPk(id, {
      include: [
        {
          model: models.ProductionOrderDetail,
          include: [models.Product], // Incluir información del producto si es necesario
        },
      ],
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error("❌ Error al actualizar la orden:", error);
    res.status(500).json({error: "Error al actualizar la orden"});
  }
};
