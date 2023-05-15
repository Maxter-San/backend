import { Request, Response } from "express";
import prisma from '../prisma';

export default async function tagsController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = req.query.userId;
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

        const tags = await prisma.tag.findMany({
            orderBy: {
                drawTag:{
                    _count: req.query.orderBy as any || undefined,
                },
            },
            include:{
                drawTag: true,
            },
            take: limit,
        });

        res.status(200).send({ "result": "Obtener tags funciona correctamente!", tags });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el getTags." });

    }
}