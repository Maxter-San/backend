import { Request, Response } from "express";
import prisma from '../prisma';

export default async function existentMailController(req: Request, res: Response) {
    try {
        const existentEmail = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        
        if(existentEmail){
            res.status(400).send({
                error: true,
                "result": "Email ya registrado",
            });
            return;
        }


        //res.send({ "result": "Usuario agregado con exito" });
        res.status(200).send({ "result": "Email disponible!" });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el sign-up" });

    }
}