"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceCalculatorController = void 0;
const axios_1 = __importDefault(require("axios"));
const distanceCalculatorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obeliscoCoordinates = { lat: -34.6037389, lon: -58.3815704 };
        const normalizedDirection = req.body.direccion;
        if (normalizedDirection) {
            const directionArray = normalizedDirection.split(",");
            const data = yield getDirection(directionArray).then((response) => response);
            if (data.direcciones[0]) {
                const { lat, lon } = data.direcciones[0].ubicacion;
                const distance = findDistance(lat, lon, obeliscoCoordinates.lat, obeliscoCoordinates.lon);
                if (distance > 5) {
                    res.status(200).json({
                        msg: "Estas lejos del Obelisco",
                    });
                }
                else if (distance <= 5) {
                    res.status(200).json({
                        msg: "Estas a menos de 5 Kilómetros del Obelisco",
                    });
                }
            }
            else {
                res.status(400).json({
                    Error: "No conozco esa dirección",
                });
            }
        }
        else {
            res.status(400).json({
                Error: "Parameter direccion needed",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            Error: error,
        });
    }
});
exports.distanceCalculatorController = distanceCalculatorController;
const findDistance = (lat, lon, obeliscoLat, obeliscoLon) => {
    const R = 6371;
    const dLat = deg2rad(obeliscoLat - lat);
    const dLon = deg2rad(obeliscoLon - lon);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) *
            Math.cos(deg2rad(obeliscoLat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};
const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};
const getDirection = (directionArray) => __awaiter(void 0, void 0, void 0, function* () {
    const json = yield axios_1.default
        .get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${directionArray[0]}&departamento=${directionArray[1]}&provincia=${directionArray[2]}`);
    return json.data;
});
