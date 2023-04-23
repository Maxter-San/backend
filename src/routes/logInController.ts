import { Request, Response } from "express";
import prisma from '../prisma';

export default async function logInController(req: Request, res: Response) {
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
}