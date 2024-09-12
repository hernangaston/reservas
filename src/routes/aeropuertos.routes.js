import { Router } from "express";
import {
    getAeropuertos,
    getAeropuerto,
    createAeropuerto,
    updateAeropuerto,
    deleteAeropuerto
} from "../controllers/aeropuertos.controller.js";

const router = Router();

router.get("/aeropuertos", getAeropuertos);
router.get("/aeropuertos/:id", getAeropuerto);
router.post("/aeropuertos", createAeropuerto);
router.put("/aeropuertos/:id", updateAeropuerto);
router.delete("/aeropuertos/:id", deleteAeropuerto);

export default router;