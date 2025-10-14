import express from "express";
import { resolveDenial } from "../controllers/denialController.js";

const router = express.Router();

router.post("/resolve", resolveDenial);

export default router;
