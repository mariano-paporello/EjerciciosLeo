import { Router } from "express";
import { distanceCalculatorController } from "../controllers/distanceCalculatorController";

const distanceCalculatorRoute = Router()

distanceCalculatorRoute.post("/", distanceCalculatorController)

export default distanceCalculatorRoute

