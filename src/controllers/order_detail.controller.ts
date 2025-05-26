import {Request, Response} from "express";
import models from "../database/models";
import {Op, Sequelize} from "sequelize";

export const getOrderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all, id_sector_process, id_machine, date} = req.query;

    const orderDetails = await models.ProductionOrderDetail.findAll({
      paranoid: all ? false : true,
      include: [
        {model: models.Production},
        {model: models.Machine},
        {
          model: models.ProductionOrder,
          required: date ? true : false,
          where: {
            init_date: {
              [Op.lte]: date ? date : {[Op.ne]: null}, // Menor o igual que date
            },
            end_date: {
              [Op.gte]: date ? date : {[Op.ne]: null}, // Mayor o igual que date
            },
          },
        },

        {
          model: models.Product,
          required: true,
          include: [
            {
              model: models.ProductModel,
              required: id_sector_process ? true : false,
              include: [
                {
                  model: models.SectorProcess,
                  include: [{model: models.Process}, {model: models.Sector}],
                },
              ],
              where: {
                id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
              },
            },
          ],
        },
      ],
      where: {
        id_machine: id_machine ? id_machine : {[Op.ne]: null},
      },
    });
    res.json(orderDetails);
  } catch (error) {
    console.error("❌ Error al obtener los detalles de las órdenes:", error);
    res.status(500).json({error: "Error al obtener los detalles de las órdenes"});
  }
};

export const getOrderDetailById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const orderDetail = await models.ProductionOrderDetail.findByPk(id);
    if (!orderDetail) {
      res.status(404).json({error: "Detalle de la orden no encontrado"});
      return;
    }
    res.json(orderDetail);
  } catch (error) {
    console.error("❌ Error al obtener el detalle de la orden:", error);
    res.status(500).json({error: "Error al obtener el detalle de la orden"});
  }
};

export const createOrderDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const newOrderDetail = await models.ProductionOrderDetail.create(req.body);
    res.status(201).json(newOrderDetail);
  } catch (error) {
    console.error("❌ Error al crear el detalle de la orden:", error);
    res.status(500).json({error: "Error al crear el detalle de la orden"});
  }
};

export const updateOrderDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const dataUpdate = req.body;

    const TempOrderDetail = await models.ProductionOrderDetail.findByPk(id);
    if (!TempOrderDetail) {
      res.status(404).json({error: "Detalle de la orden no encontrado"});
      return;
    }
    console.log(dataUpdate);
    await TempOrderDetail.update(dataUpdate);
    res.json(TempOrderDetail);
  } catch (error) {
    console.error("❌ Error al actualizar el detalle de la orden:", error);
    res.status(500).json({error: "Error al actualizar el detalle de la orden"});
  }
};

export const deleteOrderDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const orderDetail = await models.ProductionOrderDetail.findByPk(id);
    if (!orderDetail) {
      res.status(404).json({error: "Detalle de la orden no encontrado"});
      return;
    }
    await orderDetail.destroy();
    res.json({message: "Detalle de la orden eliminado correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar el detalle de la orden:", error);
    res.status(500).json({error: "Error al eliminar el detalle de la orden"});
  }
};

export const recoverOrderDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempOrderDetail = await models.ProductionOrderDetail.findByPk(id, {
      paranoid: false,
    });
    if (!TempOrderDetail) {
      res.status(404).json({error: "Detalle de la orden no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempOrderDetail.restore();

    // Busca nuevamente el registro para confirmar
    const updatedOrderDetail = await models.ProductionOrderDetail.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedOrderDetail);
  } catch (error) {
    console.error("❌ Error al recuperar el detalle de la orden:", error);
    res.status(500).json({error: "Error al recuperar el detalle de la orden"});
  }
};
