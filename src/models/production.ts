import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize"; 
import { UserModel } from "./user";
import { OrderDetailModel } from "./order_detail";
import { MachineModel } from "./machine";

export const ProductionModel = sequelize.define("production", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  id_machine: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_order_detail: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

MachineModel.hasMany(ProductionModel, { foreignKey: "id_machine" });
ProductionModel.belongsTo(MachineModel, { foreignKey: "id_machine" });

OrderDetailModel.hasMany(ProductionModel, { foreignKey: "id_order_detail" });
ProductionModel.belongsTo(OrderDetailModel, { foreignKey: "id_order_detail" });

UserModel.hasMany(ProductionModel, { foreignKey: "id_user" });
ProductionModel.belongsTo(UserModel, { foreignKey: "id_user" });

