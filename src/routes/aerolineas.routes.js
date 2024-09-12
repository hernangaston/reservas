import { Router } from "express";
import {
    getAerolineas,
    getAerolinea,
    createAerolinea,
    updateAerolinea,
    deleteAerolinea
} from "../controllers/aerolineas.controller.js";

const router = Router();

router.get("/aerolineas", getAerolineas);
router.get("/aerolineas/:id", getAerolinea);
router.post("/aerolineas", createAerolinea);
router.put("/aerolineas/:id", updateAerolinea);
router.delete("/aerolineas/:id", deleteAerolinea);

export default router;