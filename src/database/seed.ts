import models from "./models";
import bcryptjs from "bcryptjs";

export const seedDatabase = async () => {
  try {
    // Inserta datos de sector
    const sectorCount = await models.Sector.count();
    if (sectorCount === 0) {
      await models.Sector.bulkCreate([
        {id: 1, name: "Bolsas", description: "Sector de producción de productos"},
        {id: 2, name: "Inyección", description: "Sector encargado del reciclaje de materiales"},
        {id: 3, name: "Termoformado", description: "Sector de almacenamiento de productos"},
        {id: 4, name: "Expandido", description: "Sector de almacenamiento de productos"},
        {id: 5, name: "Reciclado", description: "Sector de almacenamiento de productos"},
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
    const unityCount = await models.Unity.count();
    if (unityCount === 0) {
      await models.Unity.bulkCreate([
        {name: "Kilogramos", shortname: "kg", description: "Unidad de medida en kilogramos"},
        {name: "Litros", shortname: "l", description: "Unidad de medida en litros"},
        {name: "Unidades", shortname: "u", description: "Unidad de medida por cantidad de piezas"},
      ]);
      console.log("✅ Datos de Unidad insertados");
    }

    // Inserta datos de proceso
    const processCount = await models.Process.count();
    if (processCount === 0) {
      await models.Process.bulkCreate([
        {name: "Extrusión", description: "Proceso de extrusión de materiales"},
        {name: "Impresión", description: "Proceso de impresión en productos"},
      ]);
      console.log("✅ Datos de Proceso insertados");
    }

    // Inserta datos de modelo
    const modelCount = await models.Model.count();
    if (modelCount === 0) {
      await models.Model.bulkCreate([
        {name: "Modelo A", description: "", id_process: 1, id_sector: 1, type: 1},
        {name: "Modelo B", description: "", id_process: 2, id_sector: 2, type: 1},
      ]);
      console.log("✅ Datos de Modelo insertados");
    }

    // Inserta datos de Grupos
    const groupCount = await models.Machine.count();
    if (groupCount === 0) {
      await models.Group.bulkCreate([
        {name: "Grupo A", description: "", turn: 1},
        {name: "Grupo B", description: "", turn: 1},

        {name: "Grupo A", description: "", turn: 2},
        {name: "Grupo B", description: "", turn: 2},
      ]);
      console.log("✅ Datos de Máquinas insertados");
    }

    // Inserta datos de usuario
    const userCount = await models.User.count();
    if (userCount === 0) {
      const pass = await bcryptjs.hash("admin", 8);
      await models.User.bulkCreate([
        {
          name: "Isaias",
          lastname: "Salas",
          birthday: "1990-01-01",
          image: "juan.jpg",
          phone: "123456789",
          user: "admin",
          pass: pass,
          id_group: 4,
        },
        {
          name: "Ana",
          lastname: "Gómez",
          birthday: "1992-05-10",
          image: "ana.jpg",
          phone: "987654321",
          user: "anag",
          pass: pass,
          id_group: 1,
        },
      ]);
      console.log("✅ Datos de Usuario insertados");
    }

    // Inserta datos de permisos
    const permissionCount = await models.Permission.count();
    if (modelCount === 0) {
      await models.Permission.bulkCreate([
        {id: 11111, id_user: 1, id_sector: 1, degree: 1, screen: 1, module: 1},
        {id: 12221, id_user: 1, id_sector: 2, degree: 2, screen: 2, module: 1},
        {id: 13331, id_user: 1, id_sector: 3, degree: 3, screen: 3, module: 1},
        {id: 14441, id_user: 1, id_sector: 4, degree: 4, screen: 4, module: 4},
        {id: 15551, id_user: 1, id_sector: 5, degree: 5, screen: 5, module: 5},
        {id: 21112, id_user: 2, id_sector: 1, degree: 1, screen: 1, module: 2},
        {id: 22222, id_user: 2, id_sector: 2, degree: 2, screen: 2, module: 2},
        {id: 23332, id_user: 2, id_sector: 3, degree: 3, screen: 3, module: 2},
      ]);
      console.log("✅ Datos de Permiso insertados");
    }

    // Inserta datos de inventario
    const inventoryCount = await models.Inventory.count();
    if (inventoryCount === 0) {
      await models.Inventory.bulkCreate([
        {name: "Inventario A", description: "Inventario principal"},
        {name: "Inventario B", description: "Inventario secundario"},
      ]);
      console.log("✅ Datos de Inventario insertados");
    }

    // Inserta datos de lotes
    const loteCount = await models.Lote.count();
    if (loteCount === 0) {
      await models.Lote.bulkCreate([
        {name: "26042025-1", id_inventory: 1},
        {name: "25042025-1", id_inventory: 2},
      ]);
      console.log("✅ Datos de Lotes insertados");
    }

    // Inserta datos de máquinas
    const machineCount = await models.Machine.count();
    if (machineCount === 0) {
      await models.Machine.bulkCreate([
        {name: "Máquina A", description: "", id_process: 1},
        {name: "Máquina B", description: "", id_process: 2},
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
          cost: 10,
          price: 20,
          id_unity: 1,
          id_color: 1,
          id_model: 1,
        },
        {
          name: "Producto B",
          amount: 24,
          description: "Producto de prueba B",
          cost: 15,
          price: 30,
          id_unity: 2,
          id_color: 2,
          id_model: 2,
        },
      ]);
      console.log("✅ Datos de Productos insertados");
    }

    // Inserta datos de fórmulas
    const formulaCount = await models.Formula.count();
    if (formulaCount === 0) {
      await models.Formula.bulkCreate([
        {name: "Fórmula A", id_product: 1},
        {name: "Fórmula B", id_product: 2},
      ]);
      console.log("✅ Datos de Fórmulas insertados");
    }

    // Inserta datos de detalles de fórmula
    const formulaDetailCount = await models.FormulaDetail.count();
    if (formulaDetailCount === 0) {
      await models.FormulaDetail.bulkCreate([
        {name: "Detalle A", amount: 5, id_product_material: 1},
        {name: "Detalle B", amount: 10, id_product_material: 2},
      ]);
      console.log("✅ Datos de Detalles de Fórmula insertados");
    }

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
    }

    // Inserta datos de producción
    const productionCount = await models.Production.count();
    if (productionCount === 0) {
      await models.Production.bulkCreate([
        {
          description: "Producción A",
          date: new Date(),
          duration: 60,
          id_machine: 1,
          id_lote: 1,
          id_order_detail: 1,
          id_user: 1,
          quality: 1,
        },
        {
          description: "Producción B",
          date: new Date(),
          duration: 120,
          id_machine: 2,
          id_lote: 2,
          id_order_detail: 2,
          id_user: 2,
          quality: 1,
        },
        {
          description: "Producción C",
          date: new Date(),
          duration: 60,
          id_machine: 1,
          id_lote: 1,
          id_order_detail: 1,
          id_user: 1,
          quality: 1,
        },
        {
          description: "Producción D",
          date: new Date(),
          duration: 120,
          id_machine: 2,
          id_lote: 2,
          id_order_detail: 2,
          id_user: 2,
          quality: 1,
        },
      ]);
      console.log("✅ Datos de Producción insertados");
    }

    // Inserta datos de detalles de producción
    const productionDetailCount = await models.ProductionDetail.count();
    if (productionDetailCount === 0) {
      await models.ProductionDetail.bulkCreate([
        {amount: 50, id_production: 1, id_product_materia: 1},
        {amount: 100, id_production: 2, id_product_materia: 2},
      ]);
      console.log("✅ Datos de Detalles de Producción insertados");
    }

    console.log("✅ Base de datos inicializada con datos de ejemplo.");
  } catch (error) {
    console.error("❌ Error al inicializar los datos base:", error);
  }
};
