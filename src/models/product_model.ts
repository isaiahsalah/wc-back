import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {SectorProcessModel} from "./sector_process";

export const ProductModelModel = sequelize.define(
  "product_model",
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
  },
  {
    tableName: "product_model",
  }
);

SectorProcessModel.hasMany(ProductModelModel, {
  foreignKey: "id_sector_process",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductModelModel.belongsTo(SectorProcessModel, {
  foreignKey: "id_sector_process",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
