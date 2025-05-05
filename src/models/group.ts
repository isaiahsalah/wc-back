import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const GroupModel = sequelize.define("group", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type_turn: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});
