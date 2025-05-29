import {Request, Response} from "express";
import models from "../database/models";
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

export const createFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const newFormula = await models.Formula.create(req.body);
    res.status(201).json(newFormula);
  } catch (error) {
    console.error("❌ Error al crear la fórmula:", error);
    res.status(500).json({error: "Error al crear la fórmula"});
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
    const { id } = req.params;

    const formula = await models.Formula.findByPk(id);
    if (!formula) {
      res.status(404).json({ error: "Fórmula no encontrada" });
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await formula.destroy();

    res.status(200).json({ message: "Fórmula eliminada lógicamente (soft delete)." });
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({ error: "Error al eliminar la fórmula lógicamente" });
  }
};

export const hardDeleteFormula = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const formula = await models.Formula.findOne({ where: { id }, paranoid: false });
    if (!formula) {
      res.status(404).json({ error: "Fórmula no encontrada" });
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await formula.destroy({ force: true });

    res.status(200).json({ message: "Fórmula eliminada completamente (hard delete)." });
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({ error: "Error al eliminar la fórmula completamente" });
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
