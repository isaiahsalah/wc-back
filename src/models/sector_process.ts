import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {SectorModel} from "./sector";
import {ProcessModel} from "./process";

export const SectorProcessModel = sequelize.define(
  "sector_process",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_process: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "sector_process",
    timestamps: false,
    indexes: [
      {
        unique: true, // Restricción de unicidad
        fields: ["id_process", "id_sector"], // Campos que deben ser únicos juntos
      },
    ],
  }
);

ProcessModel.hasMany(SectorProcessModel, {foreignKey: "id_process"});
SectorProcessModel.belongsTo(ProcessModel, {foreignKey: "id_process"});

SectorModel.hasMany(SectorProcessModel, {foreignKey: "id_sector"});
SectorProcessModel.belongsTo(SectorModel, {foreignKey: "id_sector"});
