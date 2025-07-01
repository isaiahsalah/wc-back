import {Request, Response} from "express";
import models, {sequelize} from "../database/models";
import {Op} from "sequelize";

export const getFormulas = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id_sector_process, id_product, paranoid} = req.query;

    const formulas = await models.Formula.findAll({
      paranoid: paranoid ? true : false,
      where: {
        id_product: id_product ? id_product : {[Op.ne]: null},
      },
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
      ],
    });
    res.json(formulas);
  } catch (error) {
    console.error("❌ Error al obtener las fórmulas:", error);
    res.status(500).json({error: "Error al obtener las fórmulas"});
  }
};

export const getFormulaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const formula = await models.Formula.findByPk(id);
    if (!formula) {
      res.status(404).json({error: "Fórmula no encontrada"});
      return;
    }
    res.json(formula);
  } catch (error) {
    console.error("❌ Error al obtener la fórmula:", error);
    res.status(500).json({error: "Error al obtener la fórmula"});
  }
};
/*
export const createFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const newFormula = await models.Formula.create(req.body);
    res.status(201).json(newFormula);
  } catch (error) {
    console.error("❌ Error al crear la fórmula:", error);
    res.status(500).json({error: "Error al crear la fórmula"});
  }
};*/

export const createFormula = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction(); // Iniciar transacción

  try {
    const formula = req.body; // Extraer la orden y los detalles de la solicitud
    const {formula_costs} = req.body;
    // Verificar si la orden y los detalles existen
    if (!formula || !formula_costs || !Array.isArray(formula_costs)) {
      res.status(400).json({error: "Datos inválidos: se esperaba una orden y detalles"});
      return;
    }

    // Crear la orden dentro de la transacción
    const newFormula = await models.Formula.create(formula, {transaction});

    // 2. Crear los detalles de la orden (OrderDetails)
    // Asegurarse de asociar el ID de la orden a los detalles
    const FormulaCostsId = formula_costs.map((detail) => ({
      ...detail,
      id_formula: newFormula.get("id"), // Asignar el id de la nueva orden a los detalles
    }));

    // Crear múltiples detalles de la orden
    await models.FormulaCost.bulkCreate(FormulaCostsId, {
      transaction,
    });

    // 3. Confirmar la transacción
    await transaction.commit();
    res.status(201).json(newFormula); // Devolver la orden creada
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error al crear la orden:", error);
    res.status(500).json({error: "Error al crear la orden"});
  }
};

export const updateFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const formula = await models.Formula.findByPk(id);
    if (!formula) {
      res.status(404).json({error: "Fórmula no encontrada"});
      return;
    }
    await formula.update(req.body);
    res.json(formula);
  } catch (error) {
    console.error("❌ Error al actualizar la fórmula:", error);
    res.status(500).json({error: "Error al actualizar la fórmula"});
  }
};

export const softDeleteFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const formula = await models.Formula.findByPk(id);
    if (!formula) {
      res.status(404).json({error: "Fórmula no encontrada"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await formula.destroy();

    res.status(200).json({message: "Fórmula eliminada lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar la fórmula lógicamente"});
  }
};

export const hardDeleteFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const formula = await models.Formula.findOne({where: {id}, paranoid: false});
    if (!formula) {
      res.status(404).json({error: "Fórmula no encontrada"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await formula.destroy({force: true});

    res.status(200).json({message: "Fórmula eliminada completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar la fórmula completamente"});
  }
};

export const recoverFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempFormula = await models.Formula.findByPk(id, {paranoid: false});
    if (!TempFormula) {
      res.status(404).json({error: "Formula no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempFormula.restore();

    // Busca nuevamente el registro para confirmar
    const updatedFormula = await models.Formula.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedFormula);
  } catch (error) {
    console.error("❌ Error al recuperar el Formula:", error);
    res.status(500).json({error: "Error al recuperar el Formula"});
  }
};

/////////////////////////////////////////////////////////////////////////////

export const updateActiveFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params; // ID del producto en la fórmula

    const formula = await models.Formula.findByPk(id); // Busca la fórmula específica

    if (!formula) {
      res.status(404).json({error: "Fórmula no encontrada"});
      return;
    }

    // Actualizar todas las fórmulas relacionadas con el mismo id_product
    await models.Formula.update(
      {active: false}, // Marcar todas como inactivas inicialmente
      {where: {id_product: formula.get("id_product")}}
    );

    // Actualizar solo la fórmula específica para que sea activa
    await formula.update({active: true});

    res.json({message: "Fórmula actualizada correctamente", formula});
  } catch (error) {
    console.error("❌ Error al actualizar las fórmulas relacionadas:", error);
    res.status(500).json({error: "Error al actualizar las fórmulas relacionadas"});
  }
};

export const updateUnactiveFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params; // ID del producto en la fórmula

    const formula = await models.Formula.findByPk(id); // Busca la fórmula específica

    if (!formula) {
      res.status(404).json({error: "Fórmula no encontrada"});
      return;
    }

    // Actualizar solo la fórmula específica para que sea activa
    await formula.update({active: false});

    res.json({message: "Fórmula actualizada correctamente", formula});
  } catch (error) {
    console.error("❌ Error al actualizar las fórmulas relacionadas:", error);
    res.status(500).json({error: "Error al actualizar las fórmulas relacionadas"});
  }
};
