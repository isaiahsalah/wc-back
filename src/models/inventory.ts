import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize"; 
 

export const InventoryModel = sequelize.define("inventory", {
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
});
