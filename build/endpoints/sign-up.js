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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient();
app.get("/log-in/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userLog = yield prisma.user.findFirst({
            where: {
                userName: req.body.userName,
                password: req.body.password,
            },
        });
        if (!userLog) {
            res.status(500).send({
                error: true,
                "result": "usuario o contraseña incorrectos",
            });
            return;
        }
        res.status(200).send({ userLog });
    }
    catch (_a) {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el log-in" });
    }
}));
