import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaStudioMiddleware } from 'express-prisma-studio';
import {PrismaClient} from '@prisma/client';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = Number(process.env.PORT || 8080);

const prisma = new PrismaClient();

app.use('/prisma', PrismaStudioMiddleware(prisma));

///////////////////////// Aquí inician los endpoints /////////////////////

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
            res.status(500).send({
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
            res.status(500).send({
                error: true,
                "result": "Nombre de usuario ya registrado",
            });
            return;
        }

        const newUser = await prisma.user.create({
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
        res.status(200).send({ "result": "Usuario agregado con exito"});
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el sign-up" });

    }

});


app.post("/log-in", async (req, res) => {
    try {
        const userLog = await prisma.user.findFirst({
            where: {
                userName: req.body.userName,
                password: req.body.password,
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
});


/////////////////////////////////// UWU ////////////////////////////////////

app.listen(PORT, () => {
    console.log("UWU");
});

//npm run build
//npm run start