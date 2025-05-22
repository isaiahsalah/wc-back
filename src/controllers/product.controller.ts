import {Request, Response} from "express";
import models from "../database/models";
import {Op} from "sequelize";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id_sector, id_process, all} = req.query;
    const products = await models.Product.findAll({
      paranoid: all ? true : false,
      include: [
        {model: models.Unit, as: "product_unit"},
        {model: models.Unit, as: "product_equivalent_unit"},

        {model: models.Color},
        {
          model: models.Model,
          where: {
            id_sector: id_sector ? id_sector : {[Op.ne]: null},
            id_process: id_process ? id_process : {[Op.ne]: null},
          },
        },
      ],
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

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const product = await models.Product.findByPk(id);
    if (!product) {
      res.status(404).json({error: "Producto no encontrado"});
      return;
    }
    await product.destroy();
    res.json({message: "Producto eliminado correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar el producto:", error);
    res.status(500).json({error: "Error al eliminar el producto"});
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
