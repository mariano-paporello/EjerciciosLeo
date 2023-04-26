import { Router } from "express";
import { distanceCalculatorController } from "../controllers/distanceCalculatorController";

const distanceCalculatorRoute = Router()

distanceCalculatorRoute.get("/", distanceCalculatorController)

export default distanceCalculatorRoute

