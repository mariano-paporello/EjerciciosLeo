"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../routes/index"));
const http_1 = __importDefault(require("http"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const publicFolderPath = process.cwd() + '/public';
const errorHandler = (err, req, res, next) => {
    console.log(`EXPRESS ==> HUBO UN ERROR ${err} `);
    res.status(500).json({ err: err.message });
};
app.use(express_1.default.static(publicFolderPath));
app.use(errorHandler);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const swaggerPath = path_1.default.resolve(process.cwd(), "./swagger.yml");
const swaggerDoc = yamljs_1.default.load(swaggerPath);
// Llamo a las API
app.use('/api', index_1.default);
app.use("/home", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
const myServer = new http_1.default.Server(app);
exports.default = myServer;
