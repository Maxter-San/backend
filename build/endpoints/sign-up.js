"use strict";
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
/*
async function signUp(req: Request, res: Response){
    //app.get("/log-in/", async (req, res) => {

        try {
            const userLog = await prisma.user.findFirst({
                where: {
                    userName: (req.body as any).userName,
                    password: (req.body as any).password,
                },
            });
    
            if(!userLog){
                res.status(400).send({
                    error: true,
                    "result": "Usuario o contraseña incorrectos.",
                });

                return;
            }
    
            res.status(200).send({ userLog });
    
        }
        catch {
            res.status(500).send({ error: true, "result": "Ocurrió un error durante el log-in." });
    
        }
    //});
}*/
/*
async login() {
    const options = {
        method: 'POST',
        Headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: 'maxter',
            password: 'asdf'
        })
    };

    const response = await fetch('http://http://localhost:3000/log-in', options);
    const data = await response.json();

    console.log(data);
}*/ 
