import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionOrderModel} from "./production_order";
import {ProductModel} from "./product";
import {MachineModel} from "./machine";

export const ProductionOrderDetailModel = sequelize.define(
  "production_order_detail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_machine: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_production_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "production_order_detail",
  }
);

ProductModel.hasMany(ProductionOrderDetailModel, {
  foreignKey: "id_product",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionOrderDetailModel.belongsTo(ProductModel, {
  foreignKey: "id_product",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

MachineModel.hasMany(ProductionOrderDetailModel, {
  foreignKey: "id_machine",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionOrderDetailModel.belongsTo(MachineModel, {
  foreignKey: "id_machine",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

ProductionOrderModel.hasMany(ProductionOrderDetailModel, {
  foreignKey: "id_production_order",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionOrderDetailModel.belongsTo(ProductionOrderModel, {
  foreignKey: "id_production_order",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
