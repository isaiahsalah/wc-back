import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";
import { UserModel } from "./user"; 

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
  degree: {
    type: DataTypes.SMALLINT, 
  },
  screen: {
    type: DataTypes.SMALLINT, 
  },
});

UserModel.hasMany(PermissionModel, { foreignKey: "id_user" });
PermissionModel.belongsTo(UserModel, { foreignKey: "id_user" });

/*
//Relacion con evento

*/