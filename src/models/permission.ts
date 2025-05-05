import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {UserModel} from "./user";
import {SectorModel} from "./sector";

export const PermissionModel = sequelize.define("permission", {
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
  degree: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    validate: {min: 1, max: 5},
  },
  screen: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    validate: {min: 1, max: 30},
  },
  type_module: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    validate: {min: 1, max: 5},
  },
});

UserModel.hasMany(PermissionModel, {foreignKey: "id_user"});
PermissionModel.belongsTo(UserModel, {foreignKey: "id_user"});

SectorModel.hasMany(PermissionModel, {foreignKey: "id_sector"});
PermissionModel.belongsTo(SectorModel, {foreignKey: "id_sector"});

/*
//Relacion con evento

*/
