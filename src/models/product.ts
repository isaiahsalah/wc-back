import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize"; 
import { CategoryModel } from "./category";

export const ProductModel = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  
  measure: {
    type: DataTypes.STRING,
  },
  cost: {
    type: DataTypes.DATE,
  },
  price: {
    type: DataTypes.DATE,
  },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

CategoryModel.hasMany(ProductModel, { foreignKey: "id_category" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "id_category" });

/*
//Relacion con evento

*/