import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";
import { UserModel } from "./user";
import { PermissionModel } from "./permission";

export const PermissionDetailModel = sequelize.define("permission_detail", {
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
  id_permission: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

PermissionModel.hasMany(PermissionDetailModel, { foreignKey: "id_permission" });
PermissionDetailModel.belongsTo(PermissionModel, { foreignKey: "id_permission" });

UserModel.hasMany(PermissionDetailModel, { foreignKey: "id_user" });
PermissionDetailModel.belongsTo(UserModel, { foreignKey: "id_user" });

/*
//Relacion con evento

*/