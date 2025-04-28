import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";

export const GroupModel = sequelize.define("group", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  turn: {
    type: DataTypes.SMALLINT,
  },
});



