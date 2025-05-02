import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {SectorModel} from "./sector";
import {ProcessModel} from "./process";

export const ModelModel = sequelize.define("model", {
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
});

ProcessModel.hasMany(ModelModel, {foreignKey: "id_process"});
ModelModel.belongsTo(ProcessModel, {foreignKey: "id_process"});

SectorModel.hasMany(ModelModel, {foreignKey: "id_sector"});
ModelModel.belongsTo(SectorModel, {foreignKey: "id_sector"});
