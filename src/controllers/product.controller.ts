import { Request, Response } from "express";
import models from "../database/models";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await models.Product.findAll({ paranoid: false });
    res.json(products);
  } catch (error) {
    console.error("❌ Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await models.Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = await models.Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error al crear el producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await models.Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    console.error("❌ Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await models.Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    await product.destroy();
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};