import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const ProcessModel = sequelize.define(
  "process",
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
    tableName: "process",
  }
);
