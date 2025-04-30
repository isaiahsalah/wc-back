import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {GroupModel} from "./group";

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
    unique: true,
  },
  pass: {
    type: DataTypes.STRING,
  },
  id_group: {
    type: DataTypes.INTEGER,
  },
});

GroupModel.hasMany(UserModel, {foreignKey: "id_group"});
UserModel.belongsTo(GroupModel, {foreignKey: "id_group"});
