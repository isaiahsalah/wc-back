import sequelize from "./sequelize";

import {ModelModel} from "../models/model";
import {ColorModel} from "../models/color";

import {SectorModel} from "../models/sector";
import {FormulaModel} from "../models/formula";
import {FormulaCostModel} from "../models/formula_cost";
import {MachineModel} from "../models/machine";
import {OrderModel} from "../models/order";
import {OrderDetailModel} from "../models/order_detail";
import {PermissionModel} from "../models/permission";
import {ProcessModel} from "../models/process";
import {ProductModel} from "../models/product";
import {ProductionModel} from "../models/production";
import {ProductionCostModel} from "../models/production_cost";
import {UserModel} from "../models/user";
import {UnitModel} from "../models/unit";
import {GroupModel} from "../models/group";
import {WorkModel} from "../models/work";
import {ProductionUserModel} from "../models/production_user";
import {SectorProcessModel} from "../models/sector_process";

const models = {
  ProductionUser: ProductionUserModel,
  Color: ColorModel,
  Model: ModelModel,
  Sector: SectorModel,
  Formula: FormulaModel,
  FormulaCost: FormulaCostModel,
  Machine: MachineModel,
  Order: OrderModel,
  OrderDetail: OrderDetailModel,
  Permission: PermissionModel,
  Process: ProcessModel,
  SectorProcess: SectorProcessModel,
  Product: ProductModel,
  Production: ProductionModel,
  ProductionCost: ProductionCostModel,
  User: UserModel,
  Unit: UnitModel,
  Group: GroupModel,
  Work: WorkModel,
};

export default models;
export {sequelize};
