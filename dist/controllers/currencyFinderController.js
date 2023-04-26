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
exports.currencyFinderController = void 0;
const axios_1 = __importDefault(require("axios"));
const currencyFinderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pais } = req.body;
        if (pais) {
            const listOfCurrenciesByCode = yield getCurrenciesList();
            const listOfCountriesByCode = yield getCountriesList();
            const country = listOfCountriesByCode.find((element) => {
                return element.sName.toLowerCase() == pais.toLowerCase();
            });
            if (country && country != (null || undefined)) {
                const currency = listOfCurrenciesByCode.find((element) => {
                    const posibleCurrency = element.sISOCode.slice(0, 2);
                    return country.sISOCode === posibleCurrency;
                });
                res.status(200).json({
                    msg: `La moneda de ${country.sName} es ${currency.sName}`,
                });
            }
            else {
                res.status(400).json({
                    Error: "País no encontrado",
                });
            }
        }
        else {
            res.status(400).json({
                Error: "Parameter pais needed",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            Error: error
        });
    }
});
exports.currencyFinderController = currencyFinderController;
const getCurrenciesList = () => __awaiter(void 0, void 0, void 0, function* () {
    const listOfCurrenciesByCode = yield axios_1.default
        .post("http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCurrenciesByCode/JSON/debug?")
        .then((response) => response);
    return listOfCurrenciesByCode.data;
});
const getCountriesList = () => __awaiter(void 0, void 0, void 0, function* () {
    const listOfCountriesByCode = yield axios_1.default
        .post("http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByCode/JSON/debug?")
        .then((response) => response);
    return listOfCountriesByCode.data;
});
