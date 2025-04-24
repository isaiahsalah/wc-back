import models from "./models";

export async function seedDatabase() {
  // Inserta datos de turno solo si no existen
  const turnCount = await models.Turn.count();
  if (turnCount === 0) {
    await models.Turn.bulkCreate([
      { name: "Día", description: "Turno diurno de 7:00 AM a 7:00 PM" },
      { name: "Noche", description: "Turno nocturno de 7:00 PM a 7:00 AM" },
    ]);
    console.log("✅ Datos de Turno insertados");
  }

  // Inserta datos de sector solo si no existen
  const sectorCount = await models.Sector.count();
  if (sectorCount === 0) {
    await models.Sector.bulkCreate([
      { name: "Producción de bolsas", description: "Sector encargado de la producción de bolsas" },
      { name: "Reciclado", description: "Sector encargado del reciclaje de materiales" },
    ]);
    console.log("✅ Datos de Sector insertados");
  }

  // Inserta datos de grado
  const degreeCount = await models.Degree.count();
  if (degreeCount === 0) {
    await models.Degree.bulkCreate([
      { name: "Supervisor", description: "Encargado de supervisar las operaciones" },
      { name: "Operario", description: "Trabajador encargado de operar maquinaria" },
      { name: "Observador", description: "Persona encargada de monitorear procesos" },
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
      { name: "Erróneo", description: "Estado con errores en el proceso" },
    ]);
    console.log("✅ Datos de Estado insertados");
  }

  // Inserta datos de almacén
  const warehouseCount = await models.Warehouse.count();
  if (warehouseCount === 0) {
    await models.Warehouse.bulkCreate([
      { name: "Almacén Central", description: "Almacén principal de la empresa" },
      { name: "Almacén Secundario", description: "Almacén de soporte para materiales" },
      { name: "Almacén de Productos Terminados", description: "Almacén para productos listos para distribución" },
    ]);
    console.log("✅ Datos de Almacén insertados");
  }


  function generateData() {
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push({ name: "Rojo", description: `Color rojo utilizado en productos: ${i} ` });
    }
    return data;
  }
  // Inserta datos de color
  const colorCount = await models.Color.count();
  if (colorCount === 0) {
    await models.Color.bulkCreate(generateData());
    console.log("✅ Datos de Color insertados");
  }

  // Inserta datos de unidad
  const unityCount = await models.Unity.count();
  if (unityCount === 0) {
    await models.Unity.bulkCreate([
      { name: "Kilogramos", description: "Unidad de medida en kilogramos" },
      { name: "Litros", description: "Unidad de medida en litros" },
      { name: "Unidades", description: "Unidad de medida por cantidad de piezas" },
    ]);
    console.log("✅ Datos de Unidad insertados");
  }

  // Inserta datos de categoría
  const categoryCount = await models.Category.count();
  if (categoryCount === 0) {
    await models.Category.bulkCreate([
      { name: "Materias Primas", description: "Categoría de materiales base para producción" },
      { name: "Productos Intermedios", description: "Categoría de productos en proceso" },
      { name: "Productos Terminados", description: "Categoría de productos listos para distribución" },
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
    ]);
    console.log("✅ Datos de Proceso insertados");
  }
}
