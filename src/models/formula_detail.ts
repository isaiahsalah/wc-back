import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductModel} from "./product";
import {FormulaModel} from "./formula";

export const FormulaDetailModel = sequelize.define("formula_detail", {
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
});

ProductModel.hasMany(FormulaDetailModel, {foreignKey: "id_product_material"});
FormulaDetailModel.belongsTo(ProductModel, {foreignKey: "id_product_material"});

FormulaModel.hasMany(FormulaDetailModel, {foreignKey: "id_formula"});
FormulaDetailModel.belongsTo(FormulaModel, {foreignKey: "id_formula"});

/*
//Relacion con evento

*/
