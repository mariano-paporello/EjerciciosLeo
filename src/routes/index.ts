import { Router } from "express";
import normalizerRoute from "./normalizer";
import distanceCalculatorRoute from "./distanceCalculator"
import currencyFinderRoute from "./currencyFinder";

const mainRoute = Router()

mainRoute.use("/normalize",normalizerRoute)
mainRoute.use("/distanceCalculator",distanceCalculatorRoute)
mainRoute.use("/currencyFinder", currencyFinderRoute)


export default mainRoute
