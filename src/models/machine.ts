import { DataTypes } from "sequelize";
import sequelize  from "../database/sequelize"; 
import { ProcessModel } from "./process";
 

export const MachineModel = sequelize.define("machine", {
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
    allowNull: false,
  },
  id_process: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

ProcessModel.hasMany(MachineModel, { foreignKey: "id_process" });
MachineModel.belongsTo(ProcessModel, { foreignKey: "id_process" });

