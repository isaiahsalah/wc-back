import models from "./models";

export const seedDatabase = async () => {
  try {
    // Inserta datos de turno
    const turnCount = await models.Turn.count();
    if (turnCount === 0) {
      await models.Turn.bulkCreate([
        { name: "Día", description: "Turno diurno de 7:00 AM a 7:00 PM" },
        { name: "Noche", description: "Turno nocturno de 7:00 PM a 7:00 AM" },
        { name: "Mixto", description: "Turno mixto de 7:00 AM a 3:00 PM y 3:00 PM a 11:00 PM" },
      ]);
      console.log("✅ Datos de Turno insertados");
    }

    // Inserta datos de sector
    const sectorCount = await models.Sector.count();
    if (sectorCount === 0) {
      await models.Sector.bulkCreate([
        { name: "Producción", description: "Sector de producción de productos" },
        { name: "Reciclaje", description: "Sector encargado del reciclaje de materiales" },
        { name: "Almacenamiento", description: "Sector de almacenamiento de productos" },
      ]);
      console.log("✅ Datos de Sector insertados");
    }

    // Inserta datos de grado
    const degreeCount = await models.Degree.count();
    if (degreeCount === 0) {
      await models.Degree.bulkCreate([
        { name: "Supervisor", description: "Encargado de supervisar las operaciones" },
        { name: "Operario", description: "Trabajador encargado de operar maquinaria" },
        { name: "Técnico", description: "Especialista en mantenimiento y reparación" },
      ]);
      console.log("✅ Datos de Grado insertados");
    }

    // Inserta datos de módulo
    const moduleCount = await models.Module.count();
    if (moduleCount === 0) {
      await models.Module.bulkCreate([
        { name: "Producción", description: "Módulo principal de producción" },
        { name: "Calidad", description: "Módulo encargado del control de calidad" },
        { name: "Logística", description: "Módulo encargado de la logística y distribución" },
      ]);
      console.log("✅ Datos de Módulo insertados");
    }

    // Inserta datos de estado
    const stateCount = await models.State.count();
    if (stateCount === 0) {
      await models.State.bulkCreate([
        { name: "Bueno", description: "Estado óptimo del producto o proceso" },
        { name: "Malo", description: "Estado defectuoso del producto o proceso" },
        { name: "Regular", description: "Estado aceptable pero mejorable" },
      ]);
      console.log("✅ Datos de Estado insertados");
    }

    // Inserta datos de almacén
    const warehouseCount = await models.Warehouse.count();
    if (warehouseCount === 0) {
      await models.Warehouse.bulkCreate([
        { name: "Central", description: "Almacén principal de la empresa" },
        { name: "Secundario", description: "Almacén de soporte para materiales" },
        { name: "Productos Terminados", description: "Almacén para productos listos para distribución" },
      ]);
      console.log("✅ Datos de Almacén insertados");
    }

    // Inserta datos de color
    const colorCount = await models.Color.count();
    if (colorCount === 0) {
      await models.Color.bulkCreate([
        { name: "Rojo", description: "Color rojo utilizado en productos" },
        { name: "Azul", description: "Color azul utilizado en productos" },
        { name: "Verde", description: "Color verde utilizado en productos" },
        { name: "Amarillo", description: "Color amarillo utilizado en productos" },
        { name: "Negro", description: "Color negro utilizado en productos" },
        { name: "Blanco", description: "Color blanco utilizado en productos" },
        { name: "Gris", description: "Color gris utilizado en productos" },
        { name: "Naranja", description: "Color naranja utilizado en productos" },
        { name: "Morado", description: "Color morado utilizado en productos" },
        { name: "Rosa", description: "Color rosa utilizado en productos" },
      ]);
      console.log("✅ Datos de Color insertados");
    }

    // Inserta datos de unidad
    const unityCount = await models.Unity.count();
    if (unityCount === 0) {
      await models.Unity.bulkCreate([
        { name: "Kilogramos", shortname: "kg", description: "Unidad de medida en kilogramos" },
        { name: "Litros", shortname: "l", description: "Unidad de medida en litros" },
        { name: "Unidades", shortname: "u", description: "Unidad de medida por cantidad de piezas" },
        { name: "Metros", shortname: "m", description: "Unidad de medida en metros" },
        { name: "Centímetros", shortname: "cm", description: "Unidad de medida en centímetros" },
        { name: "Milímetros", shortname: "mm", description: "Unidad de medida en milímetros" },
        { name: "Gramos", shortname: "g", description: "Unidad de medida en gramos" },
        { name: "Toneladas", shortname: "t", description: "Unidad de medida en toneladas" },
        { name: "Cajas", shortname: "c", description: "Unidad de medida en cajas" },
        { name: "Palets", shortname: "p", description: "Unidad de medida en palets" },
      ]);
      console.log("✅ Datos de Unidad insertados");
    }

    // Inserta datos de categoría
    const categoryCount = await models.Category.count();
    if (categoryCount === 0) {
      await models.Category.bulkCreate([
        { name: "En procesos", description: "Materiales base para producción" },
        { name: "Terminado", description: "Productos en proceso" },
        { name: "En Procesos de corte", description: "Productos en proceso" },

      ]);
      console.log("✅ Datos de Categoría insertados");
    }
  // Inserta datos de proceso
  const processCount = await models.Process.count();
  if (processCount === 0) {
    await models.Process.bulkCreate([
      { name: "Extrusión", description: "Proceso de extrusión de materiales" },
      { name: "Impresión", description: "Proceso de impresión en productos" },
      { name: "Empaque", description: "Proceso de empaque de productos terminados" },
      { name: "Corte", description: "Proceso de corte de materiales" },
      { name: "Laminado", description: "Proceso de laminado de materiales" },
      { name: "Soldadura", description: "Proceso de soldadura de materiales" },
      { name: "Moldeo", description: "Proceso de moldeo de productos" },
      { name: "Pulido", description: "Proceso de pulido de superficies" },
      { name: "Reciclaje", description: "Proceso de reciclaje de materiales" },
      { name: "Inspección", description: "Proceso de inspección de calidad" },
    ]);
    console.log("✅ Datos de Proceso insertados");
  }

    // Inserta datos de modelo
    const modelCount = await models.Model.count();
    if (modelCount === 0) {
      await models.Model.bulkCreate([
        { name: "Modelo A", id_process: 1, id_sector: 1, id_category: 1 },
        { name: "Modelo B", id_process: 2, id_sector: 2, id_category: 2 },
        { name: "Modelo C", id_process: 3, id_sector: 3, id_category: 3 },
      ]);
      console.log("✅ Datos de Modelo insertados");
    }

    
    // Inserta datos de usuario
    const userCount = await models.User.count();
    if (userCount === 0) {
      await models.User.bulkCreate([
        { name: "Juan", lastname: "Pérez", birthday: "1990-01-01", image: "juan.jpg", phone: "123456789", user: "juanp", pass: "1234", id_turn: 1 },
        { name: "Ana", lastname: "Gómez", birthday: "1992-05-10", image: "ana.jpg", phone: "987654321", user: "anag", pass: "5678", id_turn: 2 },
      ]);
      console.log("✅ Datos de Usuario insertados");
    }

    console.log("✅ Base de datos inicializada con datos de ejemplo.");
  } catch (error) {
    console.error("❌ Error al inicializar los datos base:", error);
  }
};
 