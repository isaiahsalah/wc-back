import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {SysUserModel} from "./sys_user";
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

// Relación con Usuario del Sistema
SysUserModel.hasMany(PermissionModel, {
  foreignKey: "id_sys_user",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
PermissionModel.belongsTo(SysUserModel, {
  foreignKey: "id_sys_user",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Sector de Proceso
SectorProcessModel.hasMany(PermissionModel, {
  foreignKey: "id_sector_process",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
PermissionModel.belongsTo(SectorProcessModel, {
  foreignKey: "id_sector_process",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

/*
//Relacion con evento

*/
