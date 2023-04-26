"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const normalizer_1 = __importDefault(require("./normalizer"));
const distanceCalculator_1 = __importDefault(require("./distanceCalculator"));
const currencyFinder_1 = __importDefault(require("./currencyFinder"));
const mainRoute = (0, express_1.Router)();
mainRoute.use("/normalize", normalizer_1.default);
mainRoute.use("/distanceCalculator", distanceCalculator_1.default);
mainRoute.use("/currencyFinder", currencyFinder_1.default);
exports.default = mainRoute;
