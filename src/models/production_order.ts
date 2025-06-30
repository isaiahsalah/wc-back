import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {SysUserModel} from "./sys_user";
import {WorkGroupModel} from "./work_group";

export const ProductionOrderModel = sequelize.define(
  "production_order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    init_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    type_turn: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    id_work_group: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_sys_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "production_order",
  }
);

// Relación con Usuario del Sistema
SysUserModel.hasMany(ProductionOrderModel, {
  foreignKey: "id_sys_user",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionOrderModel.belongsTo(SysUserModel, {
  foreignKey: "id_sys_user",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Grupo de Trabajo
WorkGroupModel.hasMany(ProductionOrderModel, {
  foreignKey: "id_work_group",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductionOrderModel.belongsTo(WorkGroupModel, {
  foreignKey: "id_work_group",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
