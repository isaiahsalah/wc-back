import sequelize from "./sequelize";

import {ProductModelModel} from "../models/product_model";
import {ColorModel} from "../models/color";

import {SectorModel} from "../models/sector";
import {FormulaModel} from "../models/formula";
import {FormulaCostModel} from "../models/formula_cost";
import {MachineModel} from "../models/machine";
import {ProductionOrderModel} from "../models/production_order";
import {ProductionOrderDetailModel} from "../models/production_order_detail";
import {PermissionModel} from "../models/permission";
import {ProcessModel} from "../models/process";
import {ProductModel} from "../models/product";
import {ProductionModel} from "../models/production";
import {ProductionCostModel} from "../models/production_cost";
import {SysUserModel} from "../models/sys_user";
import {UnitModel} from "../models/unit";
import {WorkGroupModel} from "../models/work_group";
import {ProductionUserModel} from "../models/production_user";
import {SectorProcessModel} from "../models/sector_process";

const models = {
  ProductionUser: ProductionUserModel,
  Color: ColorModel,
  ProductModel: ProductModelModel,
  Sector: SectorModel,
  Formula: FormulaModel,
  FormulaCost: FormulaCostModel,
  Machine: MachineModel,
  ProductionOrder: ProductionOrderModel,
  ProductionOrderDetail: ProductionOrderDetailModel,
  Permission: PermissionModel,
  Process: ProcessModel,
  SectorProcess: SectorProcessModel,
  Product: ProductModel,
  Production: ProductionModel,
  ProductionCost: ProductionCostModel,
  SysUser: SysUserModel,
  Unit: UnitModel,
  WorkGroup: WorkGroupModel,
};

export default models;
export {sequelize};
