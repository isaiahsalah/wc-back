import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {UserModel} from "./user";
import {OrderDetailModel} from "./order_detail";
import {MachineModel} from "./machine";
import {LoteModel} from "./lote";
import {UnityModel} from "./unity";

export const ProductionModel = sequelize.define("production", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
  },
  quality: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_unity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_machine: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_lote: {
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

MachineModel.hasMany(ProductionModel, {foreignKey: "id_machine"});
ProductionModel.belongsTo(MachineModel, {foreignKey: "id_machine"});

OrderDetailModel.hasMany(ProductionModel, {foreignKey: "id_order_detail"});
ProductionModel.belongsTo(OrderDetailModel, {foreignKey: "id_order_detail"});

UserModel.hasMany(ProductionModel, {foreignKey: "id_user"});
ProductionModel.belongsTo(UserModel, {foreignKey: "id_user"});

LoteModel.hasMany(ProductionModel, {foreignKey: "id_lote"});
ProductionModel.belongsTo(LoteModel, {foreignKey: "id_lote"});

UnityModel.hasMany(ProductionModel, {foreignKey: "id_unity"});
ProductionModel.belongsTo(UnityModel, {foreignKey: "id_unity"});
