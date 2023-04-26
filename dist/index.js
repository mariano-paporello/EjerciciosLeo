"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
server_1.default.listen(8080, () => {
    console.log("Server is running on port 8080");
});
server_1.default.on('error', (err) => {
    console.log(`EXPRESS ==> SERVER ERROR: ${err} `, err);
});
process.on('exit', (code) => {
    console.log(`NODE ==> El proceso termino con codigo ${code}\n\n`);
});
