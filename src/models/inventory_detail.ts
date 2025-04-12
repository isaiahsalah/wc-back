import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";  
import { ProductModel } from "./product";
import { InventoryModel } from "./inventory";
 

export const InventoryDetailModel = sequelize.define("inventory_detail", {
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
  id_inventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ProductModel.hasMany(InventoryDetailModel, { foreignKey: "id_production" });
InventoryDetailModel.belongsTo(ProductModel, { foreignKey: "id_production" });

InventoryModel.hasMany(InventoryDetailModel, { foreignKey: "id_inventory" });
InventoryDetailModel.belongsTo(InventoryModel, { foreignKey: "id_inventory" });

