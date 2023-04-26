import { Router } from "express";
import { currencyFinderController } from "../controllers/currencyFinderController";

const currencyFinderRoute = Router()

currencyFinderRoute.get("/:pais", currencyFinderController)

export default currencyFinderRoute

