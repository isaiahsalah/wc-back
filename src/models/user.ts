import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";
import { TurnModel } from "./turn";
 
export const UserModel = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  birthday: {
    type: DataTypes.DATE,
  },
  image: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  user: {
    type: DataTypes.STRING,
  },
  pass: {
    type: DataTypes.STRING,
  },
  id_turn: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

TurnModel.hasMany(UserModel, { foreignKey: "id_turn" });
UserModel.belongsTo(TurnModel, { foreignKey: "id_turn" });

/*
//Relacion con evento

*/