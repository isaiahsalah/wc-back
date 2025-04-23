import { Sequelize, Model } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    define: {
      timestamps: true, // Para incluir createdAt y updatedAt automáticamente
      paranoid: true, // Para habilitar soft deletes con deletedAt
    },
    // logging: false, // Evita mostrar logs de SQL

    //logging: console.log,
  }
);

export default sequelize;
