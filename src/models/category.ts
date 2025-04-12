import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize";
import { ClassModel } from "./class";

export const CategoryModel = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  id_class: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
ClassModel.hasMany(CategoryModel, { foreignKey: "id_class" });
CategoryModel.belongsTo(ClassModel, { foreignKey: "id_class" });

