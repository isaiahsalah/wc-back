import sequelize from "./sequelize";

import {ModelModel} from "../models/model";
import {ColorModel} from "../models/color";

import {SectorModel} from "../models/sector";
import {FormulaModel} from "../models/formula";
import {FormulaDetailModel} from "../models/formula_detail";
import {MachineModel} from "../models/machine";
import {OrderModel} from "../models/order";
import {OrderDetailModel} from "../models/order_detail";
import {PermissionModel} from "../models/permission";
import {ProcessModel} from "../models/process";
import {ProductModel} from "../models/product";
import {ProductionModel} from "../models/production";
import {ProductionDetailModel} from "../models/production_detail";
import {UserModel} from "../models/user";
import {UnitModel} from "../models/unit";
import {GroupModel} from "../models/group";
import {WorkModel} from "../models/work";

const models = {
  Color: ColorModel,
  Model: ModelModel,
  Sector: SectorModel,
  Formula: FormulaModel,
  FormulaDetail: FormulaDetailModel,
  Machine: MachineModel,
  Order: OrderModel,
  OrderDetail: OrderDetailModel,
  Permission: PermissionModel,
  Process: ProcessModel,
  Product: ProductModel,
  Production: ProductionModel,
  ProductionDetail: ProductionDetailModel,
  User: UserModel,
  Unit: UnitModel,
  Group: GroupModel,
  Work: WorkModel,
};

export default models;
export {sequelize};
