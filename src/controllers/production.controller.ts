import {Request, Response} from "express";
import models, {sequelize} from "../database/models";
import {Op} from "sequelize";
import {
  calculateThresholdDate,
  formatDate,
  normalizeDateParam,
  setSecondsToEndOfMinute,
} from "../utils/func";
/*
export const getProductions = async (req: Request, res: Response): Promise<void> => {
  try {
    const {init_date, end_date, id_sector_process, id_machine, all} = req.query;

    const normalizedEndDate = normalizeDateParam(end_date);

    const endDate = normalizedEndDate ? setSecondsToEndOfMinute(new Date(normalizedEndDate)) : null;

    const productions = await models.Production.findAll({
      paranoid: all ? false : true,
      where: {
        id_machine: id_machine ? id_machine : {[Op.ne]: null},

        ...(init_date && end_date
          ? {
              date: {
                [Op.gte]: init_date,
                [Op.lte]: endDate, // Asegúrate de que `end_date` está correctamente definido
              },
            }
          : {}),
      },
      include: [
        {
          model: models.ProductionOrderDetail,
          required: true,
          include: [
            {
              model: models.Product,
              paranoid: all ? false : true,
              required: true,
              include: [
                {
                  model: models.ProductModel,
                  paranoid: all ? false : true,
                  required: true,
                  where: {
                    id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
                  },
                },
              ],
            },
            {
              model: models.ProductionOrder,
              paranoid: all ? false : true,
              include: [{model: models.WorkGroup}],
            },
          ],
        },
        {
          model: models.ProductionUser,
          include: [{model: models.SysUser, paranoid: all ? false : true}],
        },
        {model: models.Machine, paranoid: all ? false : true},
        {model: models.Unit, as: "production_unit", paranoid: all ? false : true},
        {model: models.Unit, as: "production_equivalent_unit", paranoid: all ? false : true},
      ],
      order: [["date", "DESC"]],
    });

    res.json(productions);
  } catch (error) {
    console.error("❌ Error al obtener las producciones:", error);
    res.status(500).json({error: "Error al obtener las producciones"});
  }
};*/

export const getProductions = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      init_date,
      end_date,
      id_sector_process,
      id_machine,
      all,
      page = "1",
      page_size = "50",
    } = req.query;

    const pageNum = Math.max(parseInt(page as string, 10), 1);
    //const size = Math.min(parseInt(page_size as string, 10), 100); // Máximo 100 por página
    const size = Math.min(parseInt(page_size as string, 10), 1000); // Máximo 100 por página

    const normalizedEndDate = normalizeDateParam(end_date);
    const endDate = normalizedEndDate ? setSecondsToEndOfMinute(new Date(normalizedEndDate)) : null;

    const whereClause = {
      id_machine: id_machine ? id_machine : {[Op.ne]: null},
      ...(init_date && end_date
        ? {
            date: {
              [Op.gte]: init_date,
              [Op.lte]: endDate,
            },
          }
        : {}),
    };

    // Total para frontend saber cuántas páginas hay
    //const total_records = await models.Production.count({where: whereClause});

    const total_records = await models.Production.count({
      where: whereClause,
      include: [
        {
          model: models.ProductionOrderDetail,
          required: true,
          include: [
            {
              model: models.Product,
              paranoid: all ? false : true,
              required: true,
              include: [
                {
                  model: models.ProductModel,
                  paranoid: all ? false : true,
                  required: true,
                  where: {
                    id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    // Consulta paginada
    const productions = await models.Production.findAll({
      paranoid: all ? false : true,
      where: whereClause,
      include: [
        {
          model: models.ProductionOrderDetail,
          required: true,
          include: [
            {
              model: models.Product,
              paranoid: all ? false : true,
              required: true,
              include: [
                {
                  model: models.ProductModel,
                  paranoid: all ? false : true,
                  required: true,
                  where: {
                    id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
                  },
                },
              ],
            },
            {
              model: models.ProductionOrder,
              paranoid: all ? false : true,
              include: [{model: models.WorkGroup}],
            },
          ],
        },
        {
          model: models.ProductionUser,
          include: [{model: models.SysUser, paranoid: all ? false : true}],
        },
        {model: models.Machine, paranoid: all ? false : true},
        {model: models.Unit, as: "production_unit", paranoid: all ? false : true},
        {model: models.Unit, as: "production_equivalent_unit", paranoid: all ? false : true},
      ],
      order: [["date", "DESC"]],
      limit: size,
      offset: (pageNum - 1) * size,
    });

    //console.log("📍📍📍Producciones obtenidas:", req.query);
    //console.log("📍📍📍Producciones obtenidas:", productions.length);

    res.json({
      data: productions,
      page: pageNum,
      page_size: size,
      total_records,
      total_pages: Math.ceil(total_records / size),
    });
  } catch (error) {
    console.error("❌ Error al obtener las producciones:", error);
    res.status(500).json({error: "Error al obtener las producciones"});
  }
};

export const getProductionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({error: "Producción no encontrada"});
      return;
    }
    res.json(production);
  } catch (error) {
    console.error("❌ Error al obtener la producción:", error);
    res.status(500).json({error: "Error al obtener la producción"});
  }
};

export const createProduction = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduction = await models.Production.create(req.body);
    res.status(201).json(newProduction);
  } catch (error) {
    console.error("❌ Error al crear la producción:", error);
    res.status(500).json({error: "Error al crear la producción"});
  }
};

export const updateProduction = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({error: "Producción no encontrada"});
      return;
    }
    await production.update(req.body);
    res.json(production);
  } catch (error) {
    console.error("❌ Error al actualizar la producción:", error);
    res.status(500).json({error: "Error al actualizar la producción"});
  }
};

export const softDeleteProduction = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const production = await models.Production.findByPk(id);
    if (!production) {
      res.status(404).json({error: "Producción no encontrada"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await production.destroy();

    res.status(200).json({message: "Producción eliminada lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar la producción lógicamente"});
  }
};

export const hardDeleteProduction = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const production = await models.Production.findOne({where: {id}, paranoid: false});
    if (!production) {
      res.status(404).json({error: "Producción no encontrada"});
      return;
    }

    // Buscar y eliminar los production_user asociados al production
    await models.ProductionUser.destroy({
      where: {id_production: id},
      force: true,
    });

    // Hard delete: Elimina físicamente el registro
    await production.destroy({force: true});

    res.status(200).json({message: "Producción eliminada completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar la producción completamente"});
  }
};

export const recoverProduction = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempProduction = await models.Production.findByPk(id, {
      paranoid: false,
    });
    if (!TempProduction) {
      res.status(404).json({error: "Production no encontrado"});
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
    res.status(500).json({error: "Error al recuperar el Production"});
  }
};

/////////////////////////////////////////////////////////////////////////

export const createProductions = async (req: Request, res: Response): Promise<void> => {
  const t = await sequelize.transaction(); // Inicia la transacción

  try {
    // Suponiendo que 'req.body' es un array de producciones
    const {productions} = req.body;

    // Obtener el id_production_order_detail de la primera producción
    const orderDetailId = productions[0].id_production_order_detail;

    // Obtener el id_product desde la tabla OrderDetail usando el id_production_order_detail
    const orderDetail = await models.ProductionOrderDetail.findOne({
      where: {id: orderDetailId},
      attributes: ["id_product"], // Solo obtener el id_product
      transaction: t, // Incluir la transacción para mantener la integridad
    });

    if (!orderDetail) {
      throw new Error("OrderDetail no encontrado");
    }
    const machineCode = productions[0].id_machine; // Recuperamos el id_machine
    const productCode = orderDetail.get("id_product"); // Recuperamos el id_product
    const date = formatDate(productions[0].date); // Fecha actual en formato YYYYMMDD
    const loteBase = `${date}-P${productCode}-M${machineCode}`; // Base del código del lote (ej. P123-20230507)

    // Obtener el número secuencial más alto del lote para este producto y fecha
    const maxLote = await models.Production.max("lote", {
      where: {
        lote: {
          [Op.like]: `${loteBase}-%`, // Buscar lotes que empiecen con la base
        },
      },
      paranoid: false,
      transaction: t, // Usar la misma transacción
    });

    // Generar el nuevo número secuencial basado en el último lote
    const nextSequence =
      maxLote && typeof maxLote === "string"
        ? parseInt(maxLote.split("-").pop() || "0", 10) + 1
        : 1;
    //const loteCode = `${loteBase}-${String(nextSequence).padStart(3, "0")}`; // Lote con secuencia (ej. P123-20230507-001)

    // Crear las producciones e incluir el id_lote
    const createdProductions = await Promise.all(
      productions.map(async (production: any, index: number) => {
        const currentLote = `${loteBase}-${String(nextSequence + index).padStart(3, "0")}`;

        const thresholdDate = calculateThresholdDate(new Date(production.date));

        const createdProduction = await models.Production.create(
          {
            ...production,
            threshold_date: thresholdDate,
            lote: currentLote, // Asociamos el lote generado
            duration: Math.round(production.duration),
          },
          {transaction: t}
        );

        if (production.production_users.length > 0) {
          const productionUsersData = production.production_users.map((user: any) => ({
            id_production: createdProduction.get("id"), // ID de la producción recién creada
            id_sys_user: user.id_sys_user,
          }));

          await models.ProductionUser.bulkCreate(productionUsersData, {transaction: t});
        }

        return createdProduction;
      })
    );

    const ids: Number[] = Array.from(createdProductions.map((p) => p.get("id")));

    const detailedProductions = await models.Production.findAll({
      where: {
        id: ids, // Asegúrate de que `id` sea el atributo correcto
      },
      include: [
        {
          model: models.ProductionOrderDetail,
          include: [
            {
              model: models.Product,
              include: [{model: models.ProductModel}],
            },
          ],
        },
        {model: models.Unit, as: "production_unit"},
        {model: models.Unit, as: "production_equivalent_unit"},
      ],
      transaction: t,
    });

    // Si todo es exitoso, confirmamos la transacción
    await t.commit();

    // Responder con las producciones creadas
    res.status(201).json(detailedProductions);
  } catch (error) {
    // Si ocurre algún error, revertimos la transacción
    await t.rollback();

    console.error("❌ Error al crear las producciones:", error);
    res.status(500).json({error: "Error al crear las producciones"});
  }
};

export const getAllProductionsDate = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtiene el parámetro 'date' de la consulta
    const {date} = req.query;

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
    res.status(500).json({error: "Error al obtener las producciones"});
  }
};
