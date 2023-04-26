import { Router} from "express"
import { normalizeStreetController } from "../controllers/normalizerController"

const normalizerRoute = Router()


normalizerRoute.get("/", normalizeStreetController)

export default normalizerRoute