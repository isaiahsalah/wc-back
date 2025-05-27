import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const ColorModel = sequelize.define(
  "color",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "color",
    //timestamps: false,
  }
);
