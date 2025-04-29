// app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import colorRoute from "./routes/color.route";
import userRoute from "./routes/user.route";
import unityRoute from "./routes/unity.route";
import sectorRoute from "./routes/sector.route";
import productRoute from "./routes/product.route";
import processRoute from "./routes/process.route";
import permissionRoute from "./routes/permission.route";
import orderDetailRoute from "./routes/order_detail.route";
import orderRoute from "./routes/order.route";
import modelRoute from "./routes/model.route";
import machineRoute from "./routes/machine.route";
import loteRoute from "./routes/lote.routes";
import inventoryRoute from "./routes/inventory.route";
import formulaDetailRoute from "./routes/formula_detail.route";
import formulaRoute from "./routes/formula.route";
import productionRoute from "./routes/production.route";
import productionDetailRoute from "./routes/production_detail.route";
 
// Configurar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de ejemplo
app.use("/auth", authRoute);
app.use("/pr/color", colorRoute);
app.use("/pr/user", userRoute);
app.use("/pr/unity", unityRoute);
app.use("/pr/sector", sectorRoute);
app.use("/pr/product", productRoute);
app.use("/pr/process", processRoute);
app.use("/pr/permission", permissionRoute);
app.use("/pr/order-detail", orderDetailRoute);
app.use("/pr/order", orderRoute);
app.use("/pr/model", modelRoute);
app.use("/pr/machine", machineRoute);
app.use("/pr/lote", loteRoute);
app.use("/pr/inventory", inventoryRoute);
app.use("/pr/formula-detail", formulaDetailRoute);
app.use("/pr/formula", formulaRoute);
app.use("/pr/production", productionRoute);
app.use("/pr/production-detail", productionDetailRoute);

export default app;
