import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {OrderModel} from "./order";
import {ProductModel} from "./product";

export const OrderDetailModel = sequelize.define("order_detail", {
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
  id_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ProductModel.hasMany(OrderDetailModel, {foreignKey: "id_product"});
OrderDetailModel.belongsTo(ProductModel, {foreignKey: "id_product"});

OrderModel.hasMany(OrderDetailModel, {foreignKey: "id_order"});
OrderDetailModel.belongsTo(OrderModel, {foreignKey: "id_order"});
