import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionModel} from "./production";
import {SystemUserModel} from "./sys_user";

export const ProductionUserModel = sequelize.define(
  "production_user",
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
    id_production: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "production_user",
  }
);

ProductionModel.hasMany(ProductionUserModel, {foreignKey: "id_production"});
ProductionUserModel.belongsTo(ProductionModel, {foreignKey: "id_production"});

SystemUserModel.hasMany(ProductionUserModel, {foreignKey: "id_sys_user"});
ProductionUserModel.belongsTo(SystemUserModel, {foreignKey: "id_sys_user"});
