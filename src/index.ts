// index.ts
import app from './app';
import sequelize from './database/sequelize';
import models from './database/models';
import { seedDatabase } from './database/seed';


// Obtener el puerto desde las variables de entorno o usar el puerto por defecto
const PORT =  Number(process.env.PORT) || 3000;



async function main() {
    //console.log("📦 Modelos registrados:", models);

    //console.log("📦 Modelos registrados:", sequelize.models);

    //force: false, alter: false
    await sequelize.sync({ /*force: true*/ });
    await seedDatabase()
    console.log("✅ Conectado a PostgreSQL");
  
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);

    });
  }
  
  main();
