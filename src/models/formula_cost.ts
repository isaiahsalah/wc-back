import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductModel} from "./product";
import {FormulaModel} from "./formula";

export const FormulaCostModel = sequelize.define(
  "formula_cost",
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    id_product_material: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_formula: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "formula_cost",
  }
);

ProductModel.hasMany(FormulaCostModel, {foreignKey: "id_product_material"});
FormulaCostModel.belongsTo(ProductModel, {foreignKey: "id_product_material"});

FormulaModel.hasMany(FormulaCostModel, {foreignKey: "id_formula"});
FormulaCostModel.belongsTo(FormulaModel, {foreignKey: "id_formula"});

/*
//Relacion con evento

*/
