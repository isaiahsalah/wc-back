import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {WorkGroupModel} from "./work_group";

export const SysUserModel = sequelize.define(
  "sys_user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.STRING,
    },
    user: {
      type: DataTypes.STRING,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
    },
    id_work_group: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "sys_user",
  }
);

WorkGroupModel.hasMany(SysUserModel, {foreignKey: "id_work_group"});
SysUserModel.belongsTo(WorkGroupModel, {foreignKey: "id_work_group"});
