import {Request, Response} from "express";
import models from "../database/models";
import {Op, Sequelize} from "sequelize";
/*
// Controlador para OrderDetails
export const getAllOrderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderDetails = await models.OrderDetail.findAll({paranoid: false});
    res.json(orderDetails);
  } catch (error) {
    console.error("❌ Error al obtener los detalles de las órdenes:", error);
    res.status(500).json({error: "Error al obtener los detalles de las órdenes"});
  }
};*/

export const getOrderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all} = req.query;

    const orderDetails = await models.OrderDetail.findAll({
      paranoid: all ? false : true,
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
    const orderDetail = await models.OrderDetail.findByPk(id);
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
    const newOrderDetail = await models.OrderDetail.create(req.body);
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

    const TempOrderDetail = await models.OrderDetail.findByPk(id);
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
    const orderDetail = await models.OrderDetail.findByPk(id);
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
    const TempOrderDetail = await models.OrderDetail.findByPk(id, {
      paranoid: false,
    });
    if (!TempOrderDetail) {
      res.status(404).json({error: "Detalle de la orden no encontrado"});
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
    res.status(500).json({error: "Error al recuperar el detalle de la orden"});
  }
};

////////////////////////////////////////////////////////////////////////////////////

export const getOrderDetails_date = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id_sector_process, id_machine, date} = req.query;

    // Asegúrate de que 'date' sea una cadena antes de usarlo
    const parsedDate = date ? new Date(date as string) : undefined;
    if (date && parsedDate && isNaN(parsedDate.getTime())) {
      res.status(400).json({error: "El formato de la fecha es inválido."});
      return;
    }

    const orderDetails = await models.OrderDetail.findAll({
      include: [
        {model: models.Production},
        {model: models.Machine},
        {
          model: models.Order,
          required: true,
          //as: "order",
          where: {
            init_date: {
              [Op.lte]: parsedDate ? parsedDate : {[Op.ne]: null}, // Menor o igual que parsedDate
            },
            end_date: {
              [Op.gte]: parsedDate ? parsedDate : {[Op.ne]: null}, // Mayor o igual que parsedDate
            },
          },
        },

        {
          model: models.Product,
          required: true,
          include: [
            {
              model: models.Model,
              required: true,
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

    console.log("🤣🤣🤣🤣🤣", JSON.stringify(orderDetails, null, 2));

    res.json(orderDetails);
  } catch (error) {
    console.error("❌ Error al obtener los detalles de las órdenes:", error);
    res.status(500).json({error: "Error al obtener los detalles de las órdenes"});
  }
};
