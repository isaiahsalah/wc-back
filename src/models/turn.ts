
import { DataTypes } from "sequelize";
import  sequelize  from "../database/sequelize";

export const TurnModel = sequelize.define("turn", {
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