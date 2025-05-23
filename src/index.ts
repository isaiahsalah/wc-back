// index.ts
import app from "./app";
import sequelize from "./database/sequelize";
import {seedDatabase} from "./database/seed";

// Obtener el puerto desde las variables de entorno o usar el puerto por defecto
const PORT = Number(process.env.PORT) || 3000;

async function main() {
  //console.log("📦 Modelos registrados:", models);

  //console.log("📦 Modelos registrados:", sequelize.models);

  await sequelize.sync();

  /*
  (async () => {
    try {
      await sequelize.sync({
    //force: true, 
    alter: true 
  } );
      console.log("Base de datos actualizada con los cambios del modelo.");
    } catch (error) {
      console.error("Error al actualizar la base de datos:", error);
    }
  })();*/

  await seedDatabase();
  console.log("✅ Conectado a PostgreSQL");

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

main();
