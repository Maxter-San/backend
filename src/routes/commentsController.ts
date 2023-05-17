import { Request, Response } from "express";
import prisma from '../prisma';

export default async function commentsController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = req.query.userId;
        const drawId = Number(req.query.drawId) || undefined;
        const limit = Number(req.query.limit) || undefined;

        const userLog = await prisma.user.findFirst({
            where: {
                userId: Number(userId),
                isActive: true,
                tokenLog: {
                    some: {
                        token: token,
                    }
                },
            },
            include:{
                tokenLog: {
                    where: {
                        token: token,
                    },
                },
            },
        });

        if(!userLog){
            res.status(400).send({
                error: true,
                "result": "Usuario no encontrado.",
            });
            return;
        }

        const comments = await prisma.comment.findMany({
            where:{
                drawId: drawId,
            },
            orderBy: {
                commentId: req.query.orderBy as any || undefined,
            },
            include: {
                user: true,
            },
            take: limit,
        });

        res.status(200).send({ "result": "Obtener comentarios funciona correctamente!", comments });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el getComments." });

    }
}