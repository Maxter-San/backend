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
const prisma_1 = __importDefault(require("../prisma"));
function signUpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existentEmail = yield prisma_1.default.user.findFirst({
                where: {
                    email: req.body.email,
                },
            });
            if (existentEmail) {
                res.status(500).send({
                    error: true,
                    "result": "Email ya registrado",
                });
                return;
            }
            const existentUserName = yield prisma_1.default.user.findFirst({
                where: {
                    userName: req.body.userName,
                },
            });
            if (existentUserName) {
                res.status(500).send({
                    error: true,
                    "result": "Nombre de usuario ya registrado",
                });
                return;
            }
            const newUser = yield prisma_1.default.user.create({
                data: {
                    userName: req.body.userName,
                    password: req.body.password,
                    email: req.body.email,
                    profilePhoto: req.body.profilePhoto,
                    coverPhoto: req.body.coverPhoto,
                    name: req.body.name,
                    gender: req.body.gender,
                    birthDate: req.body.birthDate,
                }
            });
            //res.send({ newUser });
            res.status(200).send({ "result": "Usuario agregado con exito" });
        }
        catch (_a) {
            res.status(500).send({ error: true, "result": "Ocurrió un error durante el sign-up" });
        }
    });
}
exports.default = signUpController;
