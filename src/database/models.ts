import sequelize from "./sequelize";

import { ModelModel } from "../models/model";
import { ColorModel } from "../models/color";
import { ModuleModel } from "../models/module";

import { CategoryModel } from "../models/category";
import { SectorModel } from "../models/sector";
import { FormulaModel } from "../models/formula";
import { FormulaDetailModel } from "../models/formula_detail";
import { InventoryModel } from "../models/inventory";
import { InventoryDetailModel } from "../models/inventory_detail";
import { MachineModel } from "../models/machine";
import { OrderModel } from "../models/order";
import { OrderDetailModel } from "../models/order_detail";
import { DegreeModel } from "../models/degree";
import { PermissionModel } from "../models/permission";
import { ProcessModel } from "../models/process";
import { ProductModel } from "../models/product";
import { ProductionModel } from "../models/production";
import { ProductionDetailModel } from "../models/production_detail";
import { TurnModel } from "../models/turn";
import { UserModel } from "../models/user";
import { WarehouseModel } from "../models/warehouse";
import { UnityModel } from "../models/unity";
import {StateModel} from "../models/state";

const models = {
  State: StateModel,
  Module: ModuleModel,
  Degree: DegreeModel,
  Color: ColorModel,
  Category: CategoryModel,
  Model: ModelModel,
  Sector: SectorModel,
  Formula: FormulaModel,
  FormulaDetail: FormulaDetailModel,
  Inventory: InventoryModel,
  InventoryDetail: InventoryDetailModel,
  Machine: MachineModel,
  Order: OrderModel,
  OrderDetail: OrderDetailModel,
  Permission: PermissionModel, 
  Process: ProcessModel,
  Product: ProductModel,
  Production: ProductionModel,
  ProductionDetail: ProductionDetailModel,
  Turn: TurnModel,
  User: UserModel,
  Warehouse: WarehouseModel,
  Unity: UnityModel,
};

export default models;
export { sequelize };
