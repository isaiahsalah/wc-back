import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const UnitModel = sequelize.define(
  "unit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    shortname: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "unit",
  }
);
