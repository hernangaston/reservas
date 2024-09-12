import express from "express";
import bodyParser from 'body-parser';
import vuelosRoutes from "./routes/vuelos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import pagosRoutes from "./routes/pagos.routes.js";
import pasajerosRoutes from "./routes/pasajeros.routes.js";
import aerolineasRouter from "./routes/aerolineas.routes.js";
import aeropuertosRouter from "./routes/aeropuertos.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


//========================= CHEQUES ===================================================
app.use("/api", usuariosRoutes);
app.use("/api", reservasRoutes);
app.use("/api", vuelosRoutes);
app.use("/api", pagosRoutes);
app.use("/api", pasajerosRoutes);
app.use("/api", aerolineasRouter);
app.use("/api", aeropuertosRouter);


export default app;