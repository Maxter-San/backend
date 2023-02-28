import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaStudioMiddleware } from 'express-prisma-studio';
import {PrismaClient} from '@prisma/client';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = Number(process.env.PORT || 3000);

const prisma = new PrismaClient();

app.use('/prisma', PrismaStudioMiddleware(prisma));

app.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.send('hola mundo');
});



app.post("/sign-up", async (req, res) => {
    try {
        const existentEmail = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if(existentEmail){
            res.send({
                error: true,
                "result": "Email ya registrado",
            });
            return;
        }

        const existentUserName = await prisma.user.findFirst({
            where: {
                userName: req.body.userName,
            },
        });
        if(existentUserName){
            res.send({
                error: true,
                "result": "Nombre de usuario ya registrado",
            });
            return;
        }


    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el sign-up" });
    }
});



app.listen(PORT, () => {
    console.log("UWU");
});

//npm run build
//npm run start