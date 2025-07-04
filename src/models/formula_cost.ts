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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    id_product: {
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

// Relación con Producto
ProductModel.hasMany(FormulaCostModel, {
  foreignKey: "id_product_material",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
FormulaCostModel.belongsTo(ProductModel, {
  foreignKey: "id_product_material",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Fórmula
FormulaModel.hasMany(FormulaCostModel, {
  foreignKey: "id_formula",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
FormulaCostModel.belongsTo(FormulaModel, {
  foreignKey: "id_formula",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

/*
//Relacion con evento

*/
