"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const normalizerController_1 = require("../controllers/normalizerController");
const normalizerRoute = (0, express_1.Router)();
normalizerRoute.get("/", normalizerController_1.normalizeStreetController);
exports.default = normalizerRoute;
