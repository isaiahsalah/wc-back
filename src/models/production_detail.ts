import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionModel} from "./production";
import {ProductModel} from "./product";

export const ProductionDetailModel = sequelize.define("production_detail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  id_production: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_production_material: {
    type: DataTypes.INTEGER,
  },
  id_product_material: {
    type: DataTypes.INTEGER,
  },
});

ProductionModel.hasMany(ProductionDetailModel, {foreignKey: "id_production"});
ProductionDetailModel.belongsTo(ProductionModel, {foreignKey: "id_production"});

ProductionModel.hasMany(ProductionDetailModel, {foreignKey: "id_production_material"});
ProductionDetailModel.belongsTo(ProductionModel, {foreignKey: "id_production_material"});

ProductModel.hasMany(ProductionDetailModel, {foreignKey: "id_product_material"});
ProductionDetailModel.belongsTo(ProductModel, {foreignKey: "id_product_material"});
