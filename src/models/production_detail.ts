import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize"; 
import { ProductionModel } from "./production";
import { ProductModel } from "./product";

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
  id_product_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ProductionModel.hasMany(ProductionDetailModel, { foreignKey: "id_production" });
ProductionDetailModel.belongsTo(ProductionModel, { foreignKey: "id_production" });

ProductModel.hasMany(ProductionDetailModel, { foreignKey: "id_product_materia" });
ProductionDetailModel.belongsTo(ProductModel, { foreignKey: "id_product_materia" });

