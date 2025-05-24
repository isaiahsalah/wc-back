import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {SectorProcessModel} from "./sector_process";

export const MachineModel = sequelize.define(
  "machine",
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
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "machine",
  }
);

SectorProcessModel.hasMany(MachineModel, {foreignKey: "id_sector_process"});
MachineModel.belongsTo(SectorProcessModel, {foreignKey: "id_sector_process"});
