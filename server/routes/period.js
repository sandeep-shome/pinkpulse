import express from "express";
import { addPeriod, deletePeriod, getPeriod } from "../controllers/period.js";

const router = express.Router();

//ADD NEW PERIOD
router.post("/add", addPeriod);

//GET ALL PERIODS
router.get("/get", getPeriod);

//REMOVE PERIOD
router.delete("/remove", deletePeriod);

export default router;
