import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionOrderDetailModel} from "./production_order_detail";
import {MachineModel} from "./machine";
import {UnitModel} from "./unit";

export const ProductionModel = sequelize.define(
  "production",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
    },
    type_quality: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    equivalent_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    micronage: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
    },
    id_unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_equivalent_unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_machine: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lote: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    id_production_order_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "production",
  }
);

MachineModel.hasMany(ProductionModel, {foreignKey: "id_machine"});
ProductionModel.belongsTo(MachineModel, {foreignKey: "id_machine"});

ProductionOrderDetailModel.hasMany(ProductionModel, {foreignKey: "id_production_order_detail"});
ProductionModel.belongsTo(ProductionOrderDetailModel, {foreignKey: "id_production_order_detail"});

UnitModel.hasMany(ProductionModel, {foreignKey: "id_unit", as: "production_unit"});
ProductionModel.belongsTo(UnitModel, {foreignKey: "id_unit", as: "production_unit"});

UnitModel.hasMany(ProductionModel, {
  foreignKey: "id_equivalent_unit",
  as: "production_equivalent_unit",
});
ProductionModel.belongsTo(UnitModel, {
  foreignKey: "id_equivalent_unit",
  as: "production_equivalent_unit",
});
