import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize"; 
import { UserModel } from "./user";
import { WarehouseModel } from "./warehouse";
 

export const InventoryModel = sequelize.define("inventory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_warehouse: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserModel.hasMany(InventoryModel, { foreignKey: "id_user" });
InventoryModel.belongsTo(UserModel, { foreignKey: "id_user" });

WarehouseModel.hasMany(InventoryModel, { foreignKey: "id_warehouse" });
InventoryModel.belongsTo(WarehouseModel, { foreignKey: "id_warehouse" });

