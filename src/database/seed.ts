import models from "./models";
import bcryptjs from "bcryptjs";

export const seedDatabase = async () => {
  try {
    // Inserta datos de sector
    const sectorCount = await models.Sector.count();
    if (sectorCount === 0) {
      await models.Sector.bulkCreate([
        {id: 1, name: "Bolsas", description: "Sector de producción "},
        {id: 2, name: "Inyección", description: "Sector de producción"},
        {id: 3, name: "Termoformado", description: "Sector de producción"},
        {id: 4, name: "Expandido", description: "Sector de producción"},
        {id: 5, name: "Reciclado", description: "Sector de producción"},
      ]);
      console.log("✅ Datos de Sector insertados");
    }

    // Inserta datos de color
    const colorCount = await models.Color.count();
    if (colorCount === 0) {
      await models.Color.bulkCreate([
        {name: "Rojo", description: "Color rojo utilizado en productos"},
        {name: "Azul", description: "Color azul utilizado en productos"},
        {name: "Verde", description: "Color verde utilizado en productos"},
        {name: "Amarillo", description: "Color amarillo utilizado en productos"},
        {name: "Negro", description: "Color negro utilizado en productos"},
        {name: "Blanco", description: "Color blanco utilizado en productos"},
      ]);
      console.log("✅ Datos de Color insertados");
    }

    // Inserta datos de unidad
    const unityCount = await models.Unit.count();
    if (unityCount === 0) {
      await models.Unit.bulkCreate([
        {name: "Bobina", shortname: "bob", description: "Unidad de medida en Bobinas"},
        {name: "Bulto", shortname: "bul", description: "Unidad de medida en Bultos"},
        {name: "Unidad", shortname: "u", description: "Unidad de medida por cantidad de piezas"},
        {name: "Metro", shortname: "m", description: "Unidad de medida en Metros"},
      ]);
      console.log("✅ Datos de Unidad insertados");
    }

    // Inserta datos de proceso
    const processCount = await models.Process.count();
    if (processCount === 0) {
      await models.Process.bulkCreate([
        {name: "Extrusión", description: "Proceso de extrusión de materiales"},
        {name: "Impresión", description: "Proceso de impresión en productos"},
        {name: "Termoformado", description: "Proceso de termoformado de productos"},
        {name: "Corte", description: "Proceso de corte de productos"},
      ]);
      console.log("✅ Datos de Proceso insertados");
    }

    // Inserta datos de Grupos
    const groupCount = await models.Group.count();
    if (groupCount === 0) {
      await models.Group.bulkCreate([
        {name: "Grupo A", description: ""},
        {name: "Grupo B", description: ""},
      ]);
      console.log("✅ Datos de Máquinas insertados");
    }

    // Inserta datos de usuario
    const userCount = await models.User.count();
    if (userCount === 0) {
      const passAdminEx = await bcryptjs.hash("adminex", 8);
      const passOperEx = await bcryptjs.hash("operex", 8);

      await models.User.bulkCreate([
        {
          name: "Usuario",
          lastname: "Administrador",
          birthday: "1990-01-01",
          phone: "00000000",
          user: "adminex",
          pass: passAdminEx,
          id_group: 1,
        },
        {
          name: "Usuario",
          lastname: "Operador",
          birthday: "1990-01-01",
          phone: "00000000",
          user: "operex",
          pass: passOperEx,
          id_group: 1,
        },
      ]);
      console.log("✅ Datos de Usuario insertados");
    }

    // Inserta datos de process sector
    const processSectorCount = await models.SectorProcess.count();
    if (processSectorCount === 0) {
      await models.SectorProcess.bulkCreate([
        //{id_user: 1, id_sector: 4, id_process: 1, degree: 4, screen: 41, type_module: 1},
        {id_process: 1, id_sector: 4},
        {id_process: 2, id_sector: 4},
        {id_process: 3, id_sector: 4},
        {id_process: 4, id_sector: 4},
        //{id_user: 2, id_sector: 4, id_process: 4, degree: 2, screen: 2, type_module: 1},
      ]);
      console.log("✅ Datos de Permiso insertados");
    }

    // Inserta datos de permisos
    const permissionCount = await models.Permission.count();
    if (permissionCount === 0) {
      await models.Permission.bulkCreate([
        {id_user: 1, id_sector_process: 1, type_degree: 4, type_screen: 41, type_module: 1},
        {id_user: 1, id_sector_process: 2, type_degree: 4, type_screen: 41, type_module: 1},
        {id_user: 1, id_sector_process: 3, type_degree: 4, type_screen: 41, type_module: 1},
        {id_user: 1, id_sector_process: 4, type_degree: 4, type_screen: 41, type_module: 1},

        //{id_user: 2, id_sector: 4, id_process: 4, degree: 2, screen: 2, type_module: 1},
      ]);
      console.log("✅ Datos de Permiso insertados");
    }

    // Inserta datos de modelo
    const modelCount = await models.Model.count();
    if (modelCount === 0) {
      await models.Model.bulkCreate([
        {name: "Modelo A", description: "", id_sector_process: 1},
        {name: "Modelo B", description: "", id_sector_process: 2},
      ]);
      console.log("✅ Datos de Modelo insertados");
    }

    // Inserta datos de máquinas
    const machineCount = await models.Machine.count();
    if (machineCount === 0) {
      await models.Machine.bulkCreate([
        {name: "Máquina A", description: "", id_sector_process: 1},
        {name: "Máquina B", description: "", id_sector_process: 2},
      ]);
      console.log("✅ Datos de Máquinas insertados");
    }

    // Inserta datos de productos
    const productCount = await models.Product.count();
    if (productCount === 0) {
      await models.Product.bulkCreate([
        {
          name: "Producto A",
          amount: 20,
          description: "Producto de prueba A",
          micronage: 200,
          type_product: 1,
          weight: 40,
          id_unit: 1,
          id_equivalent_unit: 4,
          equivalent_amount: 20,
          id_color: 1,
          id_model: 1,
        },
        {
          name: "Producto B",
          amount: 24,
          description: "Producto de prueba B",
          type_product: 1,
          weight: 40,
          id_unit: 2,
          id_equivalent_unit: 3,
          equivalent_amount: 24,
          id_color: 2,
          id_model: 2,
        },
      ]);
      console.log("✅ Datos de Productos insertados");
    }
    /*
    // Inserta datos de órdenes
    const orderCount = await models.Order.count();
    if (orderCount === 0) {
      await models.Order.bulkCreate([
        {init_date: new Date(), end_date: new Date().setDate(new Date().getDate() + 1), id_user: 1},
        {init_date: new Date(), end_date: new Date().setDate(new Date().getDate() + 1), id_user: 2},
        {
          init_date: new Date().setDate(new Date().getDate() - 2),
          end_date: new Date().setDate(new Date().getDate() - 1),
          id_user: 2,
        },
      ]);
      console.log("✅ Datos de Órdenes insertados");
    }
    
    // Inserta datos de detalles de órdenes
    const orderDetailCount = await models.OrderDetail.count();
    if (orderDetailCount === 0) {
      await models.OrderDetail.bulkCreate([
        {amount: 10, id_product: 1, id_order: 1},
        {amount: 20, id_product: 2, id_order: 2},
      ]);
      console.log("✅ Datos de Detalles de Órdenes insertados");
    }*/
    /*
    // Inserta datos de producción
    const productionCount = await models.Production.count();
    if (productionCount === 0) {
      await models.Production.bulkCreate([
        {
          description: "Producción A",
          date: new Date(),
          duration: 60,
          id_machine: 1,
          id_order_detail: 1,
          id_user: 1,
          type_quality: 1,
          micronage: [2.4, 5, 1.2],
          id_unity: 1,
          amount: 40,
        },
        {
          description: "Producción B",
          date: new Date(),
          duration: 120,
          id_machine: 2,
          id_order_detail: 2,
          id_user: 2,
          type_quality: 1,
          id_unity: 2,
          amount: 2,
        },
        {
          description: "Producción C",
          date: new Date(),
          duration: 60,
          id_machine: 1,
          id_order_detail: 1,
          id_user: 1,
          type_quality: 1,
          id_unity: 2,
          amount: 3,
        },
        {
          description: "Producción D",
          date: new Date(),
          duration: 120,
          id_machine: 2,
          id_order_detail: 2,
          id_user: 2,
          type_quality: 1,
          id_unity: 3,
          amount: 4,
        },
      ]);
      console.log("✅ Datos de Producción insertados");
    }

    
    // Inserta datos de fórmulas
    const formulaCount = await models.Formula.count();
    if (formulaCount === 0) {
      await models.Formula.bulkCreate([
        {name: "Fórmula A", description: "Fórmula A d ", id_product: 1},
        {name: "Fórmula B", description: "Fórmula Ad ", id_product: 2},
      ]);
      console.log("✅ Datos de Fórmulas insertados");
    }

    // Inserta datos de detalles de fórmula
    const formulaDetailCount = await models.FormulaDetail.count();
    if (formulaDetailCount === 0) {
      await models.FormulaDetail.bulkCreate([
        {name: "Detalle A", amount: 5, id_product_material: 1, id_formula:1},
        {name: "Detalle B", amount: 10, id_product_material: 2, id_formula:2},
      ]);
      console.log("✅ Datos de Detalles de Fórmula insertados");
    }

    // Inserta datos de detalles de producción
    const productionDetailCount = await models.ProductionDetail.count();
    if (productionDetailCount === 0) {
      await models.ProductionDetail.bulkCreate([
        {amount: 50, id_production: 1, id_product_materia: 1},
        {amount: 100, id_production: 2, id_product_materia: 2},
      ]);
      console.log("✅ Datos de Detalles de Producción insertados");
    }*/

    console.log("✅ Base de datos inicializada con datos de ejemplo.");
  } catch (error) {
    console.error("❌ Error al inicializar los datos base:", error);
  }
};
