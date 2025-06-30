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

// Relación con Sector de Proceso
SectorProcessModel.hasMany(MachineModel, {
  foreignKey: "id_sector_process",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
MachineModel.belongsTo(SectorProcessModel, {
  foreignKey: "id_sector_process",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
