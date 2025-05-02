import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductModel} from "./product";

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
});

ProductModel.hasMany(FormulaDetailModel, {foreignKey: "id_product_material"});
FormulaDetailModel.belongsTo(ProductModel, {foreignKey: "id_product_material"});

/*
//Relacion con evento

*/
