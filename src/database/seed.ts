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
        {id: 5, name: "Tanque", description: "Sector de producción"},
      ]);
      console.log("✅ Datos de Sector insertados");
    }

    // Inserta datos de proceso
    const processCount = await models.Process.count();
    if (processCount === 0) {
      await models.Process.bulkCreate([
        {id: 1, name: "Mezcla", description: "Proceso de Mezcla de materiales"},
        {id: 2, name: "Extrusión", description: "Proceso de extrusión de materiales"},
        {id: 3, name: "Impresión", description: "Proceso de impresión en productos"},
        {id: 4, name: "Corte", description: "Proceso de corte de productos"},
        {id: 5, name: "Empaque", description: "Proceso de Empaque de productos"},
        {id: 6, name: "Embultaje", description: "Proceso de Embultaje de productos"},
        {id: 7, name: "Bombilla", description: "Proceso de Bombilla de productos"},
        {id: 8, name: "Termoformado", description: "Proceso de termoformado de productos"},
        {id: 9, name: "Bombilla", description: "Proceso de Bombilla de productos"},
        {id: 10, name: "Molienda", description: "Proceso de Molienda de productos"},
        {id: 11, name: "Rotomoldeo", description: "Proceso de Molienda de productos"},
        {id: 12, name: "Terminaciones", description: "Proceso de Molienda de productos"},
      ]);
      console.log("✅ Datos de Proceso insertados");
    }

    // Inserta datos de process sector
    const processSectorCount = await models.SectorProcess.count();
    if (processSectorCount === 0) {
      await models.SectorProcess.bulkCreate([
        {id: 1, id_process: 2, id_sector: 1},
        {id: 2, id_process: 8, id_sector: 2},
        {id: 3, id_process: 8, id_sector: 3},
        {id: 4, id_process: 2, id_sector: 4},
        {id: 5, id_process: 8, id_sector: 4},
        {id: 6, id_process: 11, id_sector: 5},
      ]);
      console.log("✅ Datos de Permiso insertados");
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

    // Inserta datos de Grupos
    const groupCount = await models.WorkGroup.count();
    if (groupCount === 0) {
      await models.WorkGroup.bulkCreate([
        {name: "A", description: ""},
        {name: "B", description: ""},
      ]);
      console.log("✅ Datos de Máquinas insertados");
    }

    // Inserta datos de usuario
    const userCount = await models.SysUser.count();
    if (userCount === 0) {
      const passAdmin = await bcryptjs.hash("admin", 8);

      await models.SysUser.bulkCreate([
        {
          name: "Usuario",
          lastname: "Administrador",
          birthday: "1990-01-01",
          phone: "00000000",
          user: "admin",
          pass: passAdmin,
          id_work_group: 1,
        },
      ]);
      console.log("✅ Datos de Usuario insertados");
    }

    // Inserta datos de permisos
    const permissionCount = await models.Permission.count();
    if (permissionCount === 0) {
      await models.Permission.bulkCreate([
        {id_sys_user: 1, id_sector_process: 4, type_degree: 4, type_screen: 41, type_module: 1},
        {id_sys_user: 1, id_sector_process: 5, type_degree: 4, type_screen: 41, type_module: 1},
      ]);
      console.log("✅ Datos de Permiso insertados");
    }

    console.log("✅ Base de datos inicializada con datos de ejemplo.");
  } catch (error) {
    console.error("❌ Error al inicializar los datos base:", error);
  }
};
