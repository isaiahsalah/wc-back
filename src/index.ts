// index.ts
import app from "./app";
import sequelize from "./database/sequelize";
import {seedDatabase} from "./database/seed";

// Obtener el puerto desde las variables de entorno o usar el puerto por defecto
const PORT = Number(process.env.PORT) || 3000;

// Función para manejar el cierre de la aplicación
const gracefulShutdown = async () => {
  console.log("Cerrando conexión con la base de datos...");
  try {
    await sequelize.close();
    console.log("Conexión cerrada exitosamente.");
    process.exit(0); // Salir sin errores
  } catch (error) {
    console.error("Error al cerrar la conexión:", error);
    process.exit(1); // Salir con error
  }
};

// Capturar eventos del sistema
process.on("SIGINT", gracefulShutdown); // Ctrl+C
process.on("SIGTERM", gracefulShutdown); // Terminación del sistema

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
