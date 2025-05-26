import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionModel} from "./production";
import {UserModel} from "./user";

export const ProductionUserModel = sequelize.define(
  "production_user",
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

UserModel.hasMany(ProductionUserModel, {foreignKey: "id_user"});
ProductionUserModel.belongsTo(UserModel, {foreignKey: "id_user"});
