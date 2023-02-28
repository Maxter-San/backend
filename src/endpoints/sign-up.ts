import express from 'express';
import cors from "cors";
import {PrismaClient} from '@prisma/client';

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.get("/log-in/", async (req, res) => {
    try {
        const userLog = await prisma.user.findFirst({
            where: {
                userName: req.body.userName,
                password: req.body.password,
            },
        });

        if(!userLog){
            res.status(500).send({
                error: true,
                "result": "usuario o contraseña incorrectos",
            });
            return;
        }

        res.status(200).send({ userLog });

    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el log-in" });

    }
});
