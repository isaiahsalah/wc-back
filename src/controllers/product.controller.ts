import {Request, Response} from "express";
import models from "../database/models";
import {Op} from "sequelize";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id_sector_process, all} = req.query;
    const products = await models.Product.findAll({
      paranoid: all ? false : true,
      include: [
        {model: models.Unit, as: "product_unit"},
        {model: models.Unit, as: "product_equivalent_unit"},

        {model: models.Color},
        {
          model: models.ProductModel,
          where: {
            id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
          },
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    res.json(products);
  } catch (error) {
    console.error("❌ Error al obtener los productos:", error);
    res.status(500).json({error: "Error al obtener los productos"});
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const product = await models.Product.findByPk(id);
    if (!product) {
      res.status(404).json({error: "Producto no encontrado"});
      return;
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error);
    res.status(500).json({error: "Error al obtener el producto"});
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = await models.Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error al crear el producto:", error);
    res.status(500).json({error: "Error al crear el producto"});
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const product = await models.Product.findByPk(id);
    if (!product) {
      res.status(404).json({error: "Producto no encontrado"});
      return;
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    console.error("❌ Error al actualizar el producto:", error);
    res.status(500).json({error: "Error al actualizar el producto"});
  }
};

export const softDeleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const product = await models.Product.findByPk(id);
    if (!product) {
      res.status(404).json({error: "Producto no encontrado"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await product.destroy();

    res.status(200).json({message: "Producto eliminado lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar el producto lógicamente"});
  }
};

export const hardDeleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const product = await models.Product.findOne({where: {id}, paranoid: false});
    if (!product) {
      res.status(404).json({error: "Producto no encontrado"});
      return;
    }

    // Hard delete: Elimina físicamente el registro
    await product.destroy({force: true});

    res.status(200).json({message: "Producto eliminado completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar el producto completamente"});
  }
};

export const recoverProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempProduct = await models.Product.findByPk(id, {paranoid: false});
    if (!TempProduct) {
      res.status(404).json({error: "Product no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempProduct.restore();

    // Busca nuevamente el registro para confirmar
    const updatedProduct = await models.Product.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ Error al recuperar el Product:", error);
    res.status(500).json({error: "Error al recuperar el Product"});
  }
};
