import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {UnitModel} from "./unit";
import {ProductModelModel} from "./product_model";
import {ColorModel} from "./color";

export const ProductModel = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
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
      type: DataTypes.DECIMAL,
    },
    type_product: {
      type: DataTypes.SMALLINT,
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

    id_color: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_product_model: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "product",
  }
);

// Relación con Modelo de Producto
ProductModelModel.hasMany(ProductModel, {
  foreignKey: "id_product_model",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductModel.belongsTo(ProductModelModel, {
  foreignKey: "id_product_model",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Unidad
UnitModel.hasMany(ProductModel, {
  foreignKey: "id_unit",
  as: "product_unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductModel.belongsTo(UnitModel, {
  foreignKey: "id_unit",
  as: "product_unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Unidad Equivalente
UnitModel.hasMany(ProductModel, {
  foreignKey: "id_equivalent_unit",
  as: "product_equivalent_unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductModel.belongsTo(UnitModel, {
  foreignKey: "id_equivalent_unit",
  as: "product_equivalent_unit",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Relación con Color
ColorModel.hasMany(ProductModel, {
  foreignKey: "id_color",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
ProductModel.belongsTo(ColorModel, {
  foreignKey: "id_color",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
