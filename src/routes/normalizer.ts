import { Router} from "express"
import { normalizeStreetController } from "../controllers/normalizerController"

const normalizerRoute = Router()


normalizerRoute.post("/", normalizeStreetController)

export default normalizerRoute