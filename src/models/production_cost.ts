import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionModel} from "./production";

export const ProductionCostModel = sequelize.define(
  "production_cost",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    id_production: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "production_cost",
  }
);

// Relación con Producción
ProductionModel.hasMany(ProductionCostModel, {
  foreignKey: "id_production",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionCostModel.belongsTo(ProductionModel, {
  foreignKey: "id_production",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Producción
ProductionModel.hasMany(ProductionCostModel, {
  foreignKey: "id_production_material",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionCostModel.belongsTo(ProductionModel, {
  foreignKey: "id_production_material",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
