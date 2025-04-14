import models from "./models";


export async function seedDatabase() {
    // Inserta datos de turno solo si no existen
    const turnCount = await models.Turn.count();
    if (turnCount === 0) {
      await models.Turn.bulkCreate([
        { name: "Día", description: "Turno Diurno de 7 a 7 " },
        { name: "Noche", description: "Turno Nocturno de 7 a 7" },
      ]);
      console.log("✅ Datos de Turn insertados");
    }

    // Inserta datos de turno solo si no existen
    const sectorCount = await models.Sector.count();
    if (sectorCount === 0) {
      await models.Turn.bulkCreate([
        { name: "Bolsas", description: "Sector de bolsas" },
        { name: "Reciclado", description: "Sector de reciclado" },
      ]);
      console.log("✅ Datos de Sector insertados");
    }
  

  }