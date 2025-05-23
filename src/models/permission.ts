import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {UserModel} from "./user";
import {SectorModel} from "./sector";
import {ProcessModel} from "./process";

export const PermissionModel = sequelize.define(
  "permission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_process: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    degree: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {min: 1, max: 5},
    },
    screen: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    type_module: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {min: 1, max: 5},
    },
  }
  /*{
    indexes: [
      {
        unique: true,
        fields: ["id_user", "id_sector", "id_process", "degree", "screen", "type_module"], // Define las columnas combinadas que serán únicas
      },
    ],
  }*/
);

UserModel.hasMany(PermissionModel, {foreignKey: "id_user"});
PermissionModel.belongsTo(UserModel, {foreignKey: "id_user"});

SectorModel.hasMany(PermissionModel, {foreignKey: "id_sector"});
PermissionModel.belongsTo(SectorModel, {foreignKey: "id_sector"});

ProcessModel.hasMany(PermissionModel, {foreignKey: "id_process"});
PermissionModel.belongsTo(ProcessModel, {foreignKey: "id_process"});

/*
//Relacion con evento

*/
