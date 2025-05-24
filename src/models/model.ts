import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {SectorProcessModel} from "./sector_process";

export const ModelModel = sequelize.define(
  "model",
  {
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
    id_sector_process: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "model",
  }
);

SectorProcessModel.hasMany(ModelModel, {foreignKey: "id_sector_process"});
ModelModel.belongsTo(SectorProcessModel, {foreignKey: "id_sector_process"});
