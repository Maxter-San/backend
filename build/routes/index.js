"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logInController_1 = __importDefault(require("./logInController"));
const signUpController_1 = __importDefault(require("./signUpController"));
const routes = (0, express_1.Router)();
routes.get('/', (req, res) => res.send('Backend is ready'));
routes.post('/login', logInController_1.default);
routes.post('/signup', signUpController_1.default);
exports.default = routes;
