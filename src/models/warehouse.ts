import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const WarehouseModel = sequelize.define(
  "warehouse",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    address: {
      type: DataTypes.CHAR,
      defaultValue: false,
    },
  },
  {
    tableName: "warehouse",
    //timestamps: false,
  }
);
