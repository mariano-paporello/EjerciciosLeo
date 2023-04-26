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
exports.normalizeStreetController = void 0;
const axios_1 = __importDefault(require("axios"));
const normalizeStreetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            const { calle, provincia, altura, departamento } = req.body;
            if (calle && provincia && altura) {
                if (departamento) {
                    const data = yield findStreetWithDepartment(calle, altura, departamento, provincia);
                    if (data.direcciones.length === 1) {
                        res.status(200).json({
                            msg: data.direcciones[0].nomenclatura
                        });
                    }
                    else if (data.direcciones.length > 0) {
                        res.status(200).json({
                            msg: data.direcciones.map((element) => `Localidad con esa calle: ${element.localidad_censal.nombre}. Departamento de esa localidad: ${element.departamento.nombre}`)
                        });
                    }
                    else {
                        res.status(400).json({
                            Error: "Street not found"
                        });
                    }
                }
                else {
                    const data = yield findStreet(calle, altura, provincia);
                    if (data.direcciones.length === 1) {
                        res.status(200).json({
                            msg: data.direcciones[0].nomenclatura
                        });
                    }
                    else if (data.direcciones.length > 0) {
                        res.status(200).json({
                            msg: data.direcciones.map((element) => `Localidad con esa calle: ${element.localidad_censal.nombre}. Departamento de esa localidad: ${element.departamento.nombre}`)
                        });
                    }
                    else {
                        res.status(400).json({
                            Error: "Street not found"
                        });
                    }
                }
            }
            else {
                res.status(400).json({
                    Error: "Parameters not entered correctly"
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            Error: `Error: ${error}`
        });
    }
});
exports.normalizeStreetController = normalizeStreetController;
const findStreet = (calle, altura, provincia) => __awaiter(void 0, void 0, void 0, function* () {
    const json = yield axios_1.default.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${calle} ${altura}&provincia=${provincia}`).then(response => response);
    return json.data;
});
const findStreetWithDepartment = (calle, altura, departamento, provincia) => __awaiter(void 0, void 0, void 0, function* () {
    const json = yield axios_1.default.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${calle} ${altura}&departamento=${departamento}&provincia=${provincia}`).then(response => response);
    return json.data;
});
