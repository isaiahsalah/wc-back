import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize"; 
import { CategoryModel } from "./category";
import { UnityModel } from "./unity";

export const ProductModel = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  cost: {
    type: DataTypes.DATE,
  },
  price: {
    type: DataTypes.DATE,
  },
  id_unity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

CategoryModel.hasMany(ProductModel, { foreignKey: "id_category" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "id_category" });

UnityModel.hasMany(ProductModel, { foreignKey: "id_unity" });
ProductModel.belongsTo(UnityModel, { foreignKey: "id_unity" });
