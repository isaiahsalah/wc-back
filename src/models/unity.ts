
import { DataTypes } from "sequelize";
import  sequelize  from "../database/sequelize";

export const UnityModel = sequelize.define("unity", {
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
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});