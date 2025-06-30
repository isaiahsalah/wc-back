import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionModel} from "./production";
import {SysUserModel} from "./sys_user";

export const ProductionUserModel = sequelize.define(
  "production_user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_sys_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_production: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "production_user",
  }
);

// Relación con Producción
ProductionModel.hasMany(ProductionUserModel, {
  foreignKey: "id_production",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionUserModel.belongsTo(ProductionModel, {
  foreignKey: "id_production",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Usuario del Sistema
SysUserModel.hasMany(ProductionUserModel, {
  foreignKey: "id_sys_user",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionUserModel.belongsTo(SysUserModel, {
  foreignKey: "id_sys_user",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
