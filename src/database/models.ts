import sequelize from "./sequelize";

import {CategoryModel} from "../models/category"; 
import {ClassModel} from "../models/class"; 
import {FormulaModel} from "../models/formula"; 
import {FormulaDetailModel} from "../models/formula_detail"; 
import {InventoryModel} from "../models/inventory"; 
import {InventoryDetailModel} from "../models/inventory_detail"; 
import {MachineModel} from "../models/machine"; 
import {OrderModel} from "../models/order"; 
import {OrderDetailModel} from "../models/order_detail"; 
import {PermissionModel} from "../models/permission"; 
import {PermissionDetailModel} from "../models/permission_detail"; 
import {ProcessModel} from "../models/process"; 
import {ProductModel} from "../models/product"; 
import {ProductionModel} from "../models/production"; 
import {ProductionDetailModel} from "../models/production_detail"; 
import {TurnModel} from "../models/turn"; 
import {UserModel} from "../models/user"; 
import {WarehouseModel} from "../models/warehouse"; 

const models = {
    Category: CategoryModel,
    Class: ClassModel,
    Formula: FormulaModel,
    FormulaDetail: FormulaDetailModel,
    Inventory: InventoryModel,
    InventoryDetail: InventoryDetailModel,
    Machine: MachineModel,
    Order: OrderModel,
    OrderDetail: OrderDetailModel,
    Permission: PermissionModel,
    PermissionDetail: PermissionDetailModel,
    Process: ProcessModel,
    Product: ProductModel,
    Production: ProductionModel,
    ProductionDetail: ProductionDetailModel,
    Turn: TurnModel,
    User: UserModel,
    Warehouse: WarehouseModel,
  };
  
  export default models;
  export { sequelize };