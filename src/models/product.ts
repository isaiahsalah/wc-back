import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {UnityModel} from "./unity";
import {ModelModel} from "./model";
import {ColorModel} from "./color";

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
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  isRawMaterial: {
    type: DataTypes.BOOLEAN,
  },
  isFinishedProduct: {
    type: DataTypes.BOOLEAN,
  },
  id_unity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_color: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_model: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ModelModel.hasMany(ProductModel, {foreignKey: "id_model"});
ProductModel.belongsTo(ModelModel, {foreignKey: "id_model"});

UnityModel.hasMany(ProductModel, {foreignKey: "id_unity"});
ProductModel.belongsTo(UnityModel, {foreignKey: "id_unity"});

ColorModel.hasMany(ProductModel, {foreignKey: "id_color"});
ProductModel.belongsTo(ColorModel, {foreignKey: "id_color"});
