
import { DataTypes } from "sequelize";
import  sequelize  from "../database/sequelize";

export const WarehouseModel = sequelize.define("warehouse", {
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
});