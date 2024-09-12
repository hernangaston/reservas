import { Router } from "express";
import {
    getPasajeros,
    getPasajero,
    createPasajero,
    updatePasajero,
    deletePasajero
} from "../controllers/pasajeros.controller.js";

const router = Router();

router.get("/pasajeros", getPasajeros);
router.get("/pasajeros/:id", getPasajero);
router.post("/pasajeros", createPasajero);
router.put("/pasajeros/:id", updatePasajero);
router.delete("/pasajeros/:id", deletePasajero);

export default router;