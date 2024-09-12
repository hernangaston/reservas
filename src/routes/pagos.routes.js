import { Router } from "express";
import {
    getPagos,
    getPago,
    createPago,
    updatePago,
    deletePago
} from "../controllers/pagos.controller.js";

const router = Router();

router.get("/pagos", getPagos);
router.get("/pagos/:id", getPago);
router.post("/pagos", createPago);
router.put("/pagos/:id", updatePago);
router.delete("/pagos/:id", deletePago);

export default router;