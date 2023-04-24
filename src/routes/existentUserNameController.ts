import { Request, Response } from "express";
import prisma from '../prisma';

export default async function existentUserNameController(req: Request, res: Response) {
    try {
        const existentUserName = await prisma.user.findFirst({
            where: {
                userName: req.body.userName,
            },
        });
        if(existentUserName){
            res.status(400).send({
                error: true,
                "result": "Nombre de usuario ya registrado",
            });
            return;
        }

        res.status(200).send({ "result": "Nombre de usuario disponible!" });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el sign-up" });

    }
}