import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize";
import { GroupModel } from "./group";

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
  turn: {
    type: DataTypes.SMALLINT,
  },
});

GroupModel.hasMany(UserModel, { foreignKey: "id_turn" });
UserModel.belongsTo(GroupModel, { foreignKey: "id_turn" });
