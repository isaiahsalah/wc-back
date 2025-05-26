// Tabla: Color
export interface IColor {
  id?: number | null;
  name: string;
  description: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Unity
export interface IUnity {
  id?: number | null;
  name: string;
  shortname: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Sector
export interface ISector {
  id?: number | null;
  name: string;
  description: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Process
export interface IProcess {
  id?: number | null;
  name: string;
  description: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: User
export interface IUser {
  id?: number | null;
  name: string;
  lastname: string;
  birthday: Date;
  image: string;
  phone: string;
  user: string;
  pass: string;
  turn?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Inventory
export interface IInventory {
  id?: number | null;
  name: string;
  description: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Model
export interface IModel {
  id?: number | null;
  name: string;
  description: string;
  id_process: number;
  process?: IProcess | null;
  id_sector: number;
  sector?: ISector | null;
  type: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Product
export interface IProduct {
  id?: number | null;
  name: string;
  description: string;
  cost: number;
  price: number;
  amount: number;
  id_unity: number;
  unity?: IUnity | null;
  id_color: number;
  color?: IColor | null;
  id_product_model: number;
  model?: IModel | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Formula
export interface IFormula {
  id?: number | null;
  name: string;
  active?: boolean;
  id_product: number;
  product?: IProduct | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: FormulaDetail
export interface IFormulaDetail {
  id?: number | null;
  name: string;
  amount: number;
  id_product_material: number;
  productMaterial?: IProduct | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Lote
export interface ILote {
  id?: number | null;
  amount: number;
  id_inventory: number;
  inventory?: IInventory | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Machine
export interface IMachine {
  id?: number | null;
  name: string;
  description: string;
  id_process: number;
  process?: IProcess | null;
  active?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Order
export interface IOrder {
  id?: number | null;
  order_date: Date;
  completion_date?: Date | null;
  id_sys_user: number;
  user?: IUser | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: OrderDetail
export interface IOrderDetail {
  id?: number | null;
  amount: number;
  id_product: number;
  product?: IProduct | null;
  id_production_order: number;
  order?: IOrder | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Permission
export interface IPermission {
  id?: number | null;
  name: string;
  id_sys_user: number;
  user?: IUser | null;
  degree?: number;
  screen?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: Production
export interface IProduction {
  id?: number | null;
  description: string;
  date: Date;
  duration: number;
  amount: number;
  id_machine: number;
  machine?: IMachine | null;
  id_lote: number;
  lote?: ILote | null;
  id_production_order_detail: number;
  orderDetail?: IOrderDetail | null;
  id_sys_user: number;
  user?: IUser | null;
  state?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

// Tabla: ProductionDetail
export interface IProductionDetail {
  id?: number | null;
  amount: number;
  id_production: number;
  production?: IProduction | null;
  id_product_materia: number;
  productMaterial?: IProduct | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
