import { Request, Response } from "express";
import models, { sequelize } from "../database/models";
import { Op } from "sequelize";

export const getProductions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productions = await models.Production.findAll();
    res.json(productions);
  } catch (error) {
    console.error("❌ Error al obtener las producciones:", error);
    res.status(500).json({ error: "Error al obtener las producciones" });
  }
};

export const getAllProductions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productions = await models.Production.findAll({ paranoid: false });
    res.json(productions);
  } catch (error) {
    console.error("❌ Error al obtener las producciones:", error);
    res.status(500).json({ error: "Error al obtener las producciones" });
  }
};

export const getProductionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({ error: "Producción no encontrada" });
      return;
    }
    res.json(production);
  } catch (error) {
    console.error("❌ Error al obtener la producción:", error);
    res.status(500).json({ error: "Error al obtener la producción" });
  }
};

export const createProduction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProduction = await models.Production.create(req.body);
    res.status(201).json(newProduction);
  } catch (error) {
    console.error("❌ Error al crear la producción:", error);
    res.status(500).json({ error: "Error al crear la producción" });
  }
};

export const updateProduction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({ error: "Producción no encontrada" });
      return;
    }
    await production.update(req.body);
    res.json(production);
  } catch (error) {
    console.error("❌ Error al actualizar la producción:", error);
    res.status(500).json({ error: "Error al actualizar la producción" });
  }
};

export const deleteProduction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({ error: "Producción no encontrada" });
      return;
    }
    await production.destroy();
    res.json({ message: "Producción eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar la producción:", error);
    res.status(500).json({ error: "Error al eliminar la producción" });
  }
};

export const recoverProduction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempProduction = await models.Production.findByPk(id, {
      paranoid: false,
    });
    if (!TempProduction) {
      res.status(404).json({ error: "Production no encontrado" });
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempProduction.restore();

    // Busca nuevamente el registro para confirmar
    const updatedProduction = await models.Production.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedProduction);
  } catch (error) {
    console.error("❌ Error al recuperar el Production:", error);
    res.status(500).json({ error: "Error al recuperar el Production" });
  }
};

/////////////////////////////////////////////////////////////////////////

export const createProductions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const t = await sequelize.transaction(); // Inicia la transacción

  try {
    // Suponiendo que 'req.body' es un array de producciones
    const productions = req.body;

    // Obtener el id_order_detail de la primera producción
    const orderDetailId = productions[0].id_order_detail;

    // Obtener el id_product desde la tabla OrderDetail usando el id_order_detail
    const orderDetail = await models.OrderDetail.findOne({
      where: { id: orderDetailId },
      attributes: ["id_product"], // Solo obtener el id_product
      transaction: t, // Incluir la transacción para mantener la integridad
    });

    if (!orderDetail) {
      throw new Error("OrderDetail no encontrado");
    }
    const productCode = orderDetail.get("id_product"); // Recuperamos el id_product
    const loteName = `${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${productCode}`; // Formato del código de lote

    // Crear el lote con el código generado
    const lote = await models.Lote.create(
      {
        name: loteName,
        id_inventory: 1,
      },
      { transaction: t }
    );

    // Crear las producciones e incluir el id_lote
    const createdProductions = await Promise.all(
      productions.map(async (production: any) => {
        return await models.Production.create(
          {
            ...production,
            id_lote: lote.get("id"), // Asociamos el lote creado
            duration: Math.round(production.duration),
          },
          { transaction: t }
        );
      })
    );
    const ids: Number[] = Array.from(
      createdProductions.map((p) => p.get("id"))
    );

    const detailedProductions = await models.Production.findAll({
      where: {
        id: ids, // Asegúrate de que `id` sea el atributo correcto
      },
      include: [
        {
          model: models.OrderDetail,
          include: [
            {
              model: models.Product,
              include: [{ model: models.Unity }, { model: models.Model }],
            },
          ],
        },
        {
          model: models.Lote,
        },
      ],
      transaction: t,
    });

    // Si todo es exitoso, confirmamos la transacción
    await t.commit();
    console.log("➡️➡️➡️➡️ IDs creados:", ids);

    console.log("🚩🚩🚩", JSON.stringify(detailedProductions, null, 2));
    // Responder con las producciones creadas
    res.status(201).json(detailedProductions);
  } catch (error) {
    // Si ocurre algún error, revertimos la transacción
    await t.rollback();

    console.error("❌ Error al crear las producciones:", error);
    res.status(500).json({ error: "Error al crear las producciones" });
  }
};

export const getAllProductionsDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtiene el parámetro 'date' de la consulta
    const { date } = req.query;

    // Crea una condición de filtro dependiendo de si se proporciona el parámetro 'date'
    const filter: any = {};
    if (date) {
      filter.date = date; // Ajusta 'date' al nombre real del campo en tu tabla
    }

    // Consulta las producciones, con o sin filtro de fecha
    const productions = await models.Production.findAll({
      where: {
        "$productions.date$": {
          [Op.lte]: date, // Menor o igual que date
        },
      },
      paranoid: false, // Ignora los registros eliminados si es necesario
    });

    res.json(productions);
  } catch (error) {
    console.error("❌ Error al obtener las producciones:", error);
    res.status(500).json({ error: "Error al obtener las producciones" });
  }
};
