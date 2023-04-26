import { Router } from "express";
import { currencyFinderController } from "../controllers/currencyFinderController";

const currencyFinderRoute = Router()

currencyFinderRoute.get("/", currencyFinderController)

export default currencyFinderRoute

