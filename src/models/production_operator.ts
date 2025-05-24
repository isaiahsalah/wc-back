import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionModel} from "./production";
import {UserModel} from "./user";

export const ProductionOperatorModel = sequelize.define(
  "production_operator",
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
    tableName: "production_operator",
  }
);

ProductionModel.hasMany(ProductionOperatorModel, {foreignKey: "id_production"});
ProductionOperatorModel.belongsTo(ProductionModel, {foreignKey: "id_production"});

UserModel.hasMany(ProductionOperatorModel, {foreignKey: "id_user"});
ProductionOperatorModel.belongsTo(UserModel, {foreignKey: "id_user"});
