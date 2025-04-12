import models from "./models";


export async function seedDatabase() {
    // Inserta datos solo si no existen
    const processCount = await models.Turn.count();
    if (processCount === 0) {
      await models.Turn.bulkCreate([
        { name: "Día", description: "Turno Diurno de 7 a 7 jaja" },
        { name: "Noche", description: "Turno Diurno de 7 a 7" },
      ]);
      console.log("✅ Datos de procesos insertados");
    }
  

  }