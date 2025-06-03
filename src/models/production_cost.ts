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
    id_production_material: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "production_cost",
  }
);

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
