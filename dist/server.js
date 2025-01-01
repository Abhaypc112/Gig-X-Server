"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.listen(config_1.config.SERVER_PORT, () => console.log(`Server running on http://localhost:${config_1.config.SERVER_PORT}`));
