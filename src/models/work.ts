import {DataTypes} from "sequelize";
import sequelize from "../database/sequelize";
import {ProductionModel} from "./production";
import {UserModel} from "./user";

export const WorkModel = sequelize.define("work", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_production: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type_work: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

ProductionModel.hasMany(WorkModel, {foreignKey: "id_production"});
WorkModel.belongsTo(ProductionModel, {foreignKey: "id_production"});

UserModel.hasMany(WorkModel, {foreignKey: "id_user"});
WorkModel.belongsTo(UserModel, {foreignKey: "id_user"});

/*
//Relacion con evento

*/
