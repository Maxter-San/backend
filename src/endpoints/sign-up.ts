import express from 'express';
import cors from "cors";
import {PrismaClient} from '@prisma/client';

const app = express();
app.use(cors());
const prisma = new PrismaClient();
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