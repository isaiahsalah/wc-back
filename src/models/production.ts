import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionOrderDetailModel} from "./production_order_detail";
import {MachineModel} from "./machine";
import {UnitModel} from "./unit";
import {WarehouseModel} from "./warehouse";

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
    threshold_date: {
      type: DataTypes.DATEONLY,
    },
    duration: {
      type: DataTypes.SMALLINT, // in minutes
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
    lote: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    consumed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type_size: {
      type: DataTypes.SMALLINT,
    },
    type_quality: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    id_machine: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_equivalent_unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_production_order_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "production",
  }
);

// Relación con Máquina
MachineModel.hasMany(ProductionModel, {
  foreignKey: "id_machine",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionModel.belongsTo(MachineModel, {
  foreignKey: "id_machine",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Orden de Producción
ProductionOrderDetailModel.hasMany(ProductionModel, {
  foreignKey: "id_production_order_detail",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionModel.belongsTo(ProductionOrderDetailModel, {
  foreignKey: "id_production_order_detail",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Unidad
UnitModel.hasMany(ProductionModel, {
  foreignKey: "id_unit",
  as: "production_unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionModel.belongsTo(UnitModel, {
  foreignKey: "id_unit",
  as: "production_unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Unidad Equivalente
UnitModel.hasMany(ProductionModel, {
  foreignKey: "id_equivalent_unit",
  as: "production_equivalent_unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionModel.belongsTo(UnitModel, {
  foreignKey: "id_equivalent_unit",
  as: "production_equivalent_unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Almacén
WarehouseModel.hasMany(ProductionModel, {
  foreignKey: "id_warehouse",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionModel.belongsTo(WarehouseModel, {
  foreignKey: "id_warehouse",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
