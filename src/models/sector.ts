import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const SectorModel = sequelize.define(
  "sector",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "sector",
  }
);
