import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductModel} from "./product";

export const FormulaModel = sequelize.define(
  "formula",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,

      defaultValue: true,
    },
    id_product: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },
  },
  {
    tableName: "formula",
  }
);

ProductModel.hasMany(FormulaModel, {foreignKey: "id_product"});
FormulaModel.belongsTo(ProductModel, {foreignKey: "id_product"});

/*
//Relacion con evento

*/
