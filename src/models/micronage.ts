import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProcessModel} from "./process";
import {ProductionModel} from "./production";

export const MicronageModel = sequelize.define("micronage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_production: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ProductionModel.hasMany(MicronageModel, {foreignKey: "id_production"});
MicronageModel.belongsTo(ProductionModel, {foreignKey: "id_production"});
