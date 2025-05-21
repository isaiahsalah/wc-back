import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {UnitModel} from "./unit";
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
  weight: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  equivalent_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  micronage: {
    type: DataTypes.DECIMAL,
  },
  type_product: {
    type: DataTypes.SMALLINT,
  },
  id_unit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_equivalent_unit: {
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

UnitModel.hasMany(ProductModel, {foreignKey: "id_unit", as: "product_unit"});
ProductModel.belongsTo(UnitModel, {foreignKey: "id_unit", as: "product_unit"});

UnitModel.hasMany(ProductModel, {foreignKey: "id_equivalent_unit", as: "product_equivalent_unit"});
ProductModel.belongsTo(UnitModel, {
  foreignKey: "id_equivalent_unit",
  as: "product_equivalent_unit",
});

ColorModel.hasMany(ProductModel, {foreignKey: "id_color"});
ProductModel.belongsTo(ColorModel, {foreignKey: "id_color"});
