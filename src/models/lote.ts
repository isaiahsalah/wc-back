import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";  
import { ProductModel } from "./product";
import { InventoryModel } from "./inventory";
 

export const LoteModel = sequelize.define("lote", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
  }, 
  id_inventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
 
InventoryModel.hasMany(LoteModel, { foreignKey: "id_inventory" });
LoteModel.belongsTo(InventoryModel, { foreignKey: "id_inventory" });

