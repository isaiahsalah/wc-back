
import { DataTypes } from "sequelize";
import  sequelize  from "../database/sequelize";

export const PermissionModel = sequelize.define("permission", {
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