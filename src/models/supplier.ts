import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";

export const SuplierModel = sequelize.define(
  "suplier",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    phone: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    address: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    tableName: "suplier",
    //timestamps: false,
  }
);
