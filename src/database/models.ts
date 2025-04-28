import sequelize from "./sequelize";

import { ModelModel } from "../models/model";
import { ColorModel } from "../models/color";

 import { SectorModel } from "../models/sector";
import { FormulaModel } from "../models/formula";
import { FormulaDetailModel } from "../models/formula_detail";
import { InventoryModel } from "../models/inventory";
import { LoteModel } from "../models/lote";
import { MachineModel } from "../models/machine";
import { OrderModel } from "../models/order";
import { OrderDetailModel } from "../models/order_detail";
import { PermissionModel } from "../models/permission";
import { ProcessModel } from "../models/process";
import { ProductModel } from "../models/product";
import { ProductionModel } from "../models/production";
import { ProductionDetailModel } from "../models/production_detail";
 import { UserModel } from "../models/user";
import { UnityModel } from "../models/unity";
import { GroupModel } from "../models/group";

const models = { 
  Color: ColorModel,
   Model: ModelModel,
  Sector: SectorModel,
  Formula: FormulaModel,
  FormulaDetail: FormulaDetailModel,
  Inventory: InventoryModel,
  Lote: LoteModel,
  Machine: MachineModel,
  Order: OrderModel,
  OrderDetail: OrderDetailModel,
  Permission: PermissionModel,
  Process: ProcessModel,
  Product: ProductModel,
  Production: ProductionModel,
  ProductionDetail: ProductionDetailModel,
   User: UserModel,
  Unity: UnityModel,
  Group: GroupModel,
};

export default models;
export { sequelize };
