// app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colorRoute from "./routes/color.route";
//import corteRoute from "./routes/corte.route";
//import impresionRoute from "./routes/impresion.route";

// Configurar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de ejemplo

app.use("/pr/color", colorRoute);
//app.use("/corte", corteRoute);
//app.use("/impresion", impresionRoute);
app.get("/example", async (req, res) => {
  
  res.json("hello word");
});


export default app;
