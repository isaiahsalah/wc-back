import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";
import { SectorModel } from "./sector";
import { ProcessModel } from "./process";

export const CategoryModel = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
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

SectorModel.hasMany(CategoryModel, { foreignKey: "id_sector" });
CategoryModel.belongsTo(SectorModel, { foreignKey: "id_sector" });

ProcessModel.hasMany(CategoryModel, { foreignKey: "id_process" });
CategoryModel.belongsTo(ProcessModel, { foreignKey: "id_process" });


