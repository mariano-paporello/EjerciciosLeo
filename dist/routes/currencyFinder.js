"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const currencyFinderController_1 = require("../controllers/currencyFinderController");
const currencyFinderRoute = (0, express_1.Router)();
currencyFinderRoute.get("/:pais", currencyFinderController_1.currencyFinderController);
exports.default = currencyFinderRoute;
