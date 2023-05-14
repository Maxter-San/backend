import { Request, Response } from "express";
import prisma from '../prisma';
import tokenValidation from "../utils/tokenValidation";

export default async function uploadDrawController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        if(!token){
            res.status(400).send({
                error: true,
                "result": "Falta de token.",
            });
            return;
        }
        const tokenValid = await tokenValidation(token);
        if(!tokenValid){
            res.status(400).send({
                error: true,
                "result": "Token invalido.",
            });
            return;
        }

        const userId = Number(req.body.userId);
        const newDraw = await prisma.draw.create({
            data: {
                userId: userId,
                draw: req.body.draw,
                title: req.body.title,
                description: req.body.description,
                restrict18: req.body.restrict18,
                isPublic: req.body.isPublic, 
            },
        });

        res.status(200).send({ "result": "Dibujo subido correctamente!", newDraw });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el upload draw." });

    }
}