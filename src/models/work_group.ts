import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const WorkGroupModel = sequelize.define(
  "work_group",
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
      allowNull: false,
    },
  },
  {
    tableName: "work_group",
  }
);
