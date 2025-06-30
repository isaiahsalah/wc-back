import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const InventoryModel = sequelize.define(
  "inventory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_production: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    consumed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "inventory",
    //timestamps: false,
  }
);
