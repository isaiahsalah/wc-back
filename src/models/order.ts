import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {UserModel} from "./user";
import {GroupModel} from "./group";

export const OrderModel = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  init_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  type_turn: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_group: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserModel.hasMany(OrderModel, {foreignKey: "id_user"});
OrderModel.belongsTo(UserModel, {foreignKey: "id_user"});

GroupModel.hasMany(OrderModel, {foreignKey: "id_group"});
OrderModel.belongsTo(GroupModel, {foreignKey: "id_group"});
