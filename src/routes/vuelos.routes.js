import { Router } from "express";
import {
    getVuelos,
    getVuelo,
    createVuelo,
    updateVuelo,
    deleteVuelo
} from "../controllers/vuelos.controller.js";

const router = Router();

router.get("/vuelos", getVuelos);
router.get("/vuelos/:id", getVuelo);
router.post("/vuelos", createVuelo);
router.put("/vuelos/:id", updateVuelo);
router.delete("/vuelos/:id", deleteVuelo);

export default router;