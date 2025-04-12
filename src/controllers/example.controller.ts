import { Request, Response } from "express";
import sequelize from "../database/sequelize";

export const getExample = async (req: Request, res: Response) => {
  try {
    console.log("hola");
    const users = {saludo:"hola"};

    res.json(users);
  } catch (error) {
    console.error("❌ Error en consulta bruta:", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};
