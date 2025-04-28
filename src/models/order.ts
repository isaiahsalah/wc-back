import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";
import { UserModel } from "./user";

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
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserModel.hasMany(OrderModel, { foreignKey: "id_user" });
OrderModel.belongsTo(UserModel, { foreignKey: "id_user" });

/*
//Relacion con evento

*/