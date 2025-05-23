import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProcessModel} from "./process";
import {SectorModel} from "./sector";

export const MachineModel = sequelize.define("machine", {
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
  id_process: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_sector: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

ProcessModel.hasMany(MachineModel, {foreignKey: "id_process"});
MachineModel.belongsTo(ProcessModel, {foreignKey: "id_process"});

SectorModel.hasMany(MachineModel, {foreignKey: "id_sector"});
MachineModel.belongsTo(SectorModel, {foreignKey: "id_sector"});
