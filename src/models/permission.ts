import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {SystemUserModel} from "./sys_user";
import {SectorProcessModel} from "./sector_process";

export const PermissionModel = sequelize.define(
  "permission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_sys_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_sector_process: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_degree: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {min: 1, max: 5},
    },
    type_screen: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    type_module: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {min: 1, max: 5},
    },
  },
  {
    tableName: "permission",
  }
  /*{
    indexes: [
      {
        unique: true,
        fields: ["id_sys_user", "id_sector", "id_process", "degree", "screen", "type_module"], // Define las columnas combinadas que serán únicas
      },
    ],
  }*/
);

SystemUserModel.hasMany(PermissionModel, {foreignKey: "id_sys_user"});
PermissionModel.belongsTo(SystemUserModel, {foreignKey: "id_sys_user"});

SectorProcessModel.hasMany(PermissionModel, {foreignKey: "id_sector_process"});
PermissionModel.belongsTo(SectorProcessModel, {foreignKey: "id_sector_process"});

/*
//Relacion con evento

*/
