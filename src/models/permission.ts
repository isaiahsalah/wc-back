import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";
import { UserModel } from "./user";
import { DegreeModel } from "./degree";
import { ModuleModel } from "./module";

export const PermissionModel = sequelize.define("permission", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_degree: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_module: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ModuleModel.hasMany(PermissionModel, { foreignKey: "id_module" });
PermissionModel.belongsTo(ModuleModel, { foreignKey: "id_module" });

UserModel.hasMany(PermissionModel, { foreignKey: "id_user" });
PermissionModel.belongsTo(UserModel, { foreignKey: "id_user" });

/*
//Relacion con evento

*/