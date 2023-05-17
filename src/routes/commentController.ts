import { Request, Response } from "express";
import prisma from '../prisma';
import tokenValidation from "../utils/tokenValidation";

export default async function commentController(req: Request, res: Response) {
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
        const drawId = Number(req.body.drawId);
        const newComment = await prisma.comment.create({
            data: {
                userId: userId,
                drawId: drawId,
                comment: req.body.comment,
            },
        });

        res.status(200).send({ "result": "Comentario subido correctamente!", newComment });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el addComment." });

    }
}