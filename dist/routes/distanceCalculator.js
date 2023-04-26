"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const distanceCalculatorController_1 = require("../controllers/distanceCalculatorController");
const distanceCalculatorRoute = (0, express_1.Router)();
distanceCalculatorRoute.get("/", distanceCalculatorController_1.distanceCalculatorController);
exports.default = distanceCalculatorRoute;
