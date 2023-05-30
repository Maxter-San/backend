import { Request, Response } from "express";
import prisma from '../prisma';

export default async function deletetagsController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = Number(req.body.userId);
        const drawId = Number(req.body.drawId);
        
        const userLog = await prisma.user.findFirst({
            where: {
                userId: userId,
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

        const tags = await prisma.drawTag.deleteMany({
            where: {
                drawId: drawId,
            },
        });

        res.status(200).send({ "result": "Borrar tags funciona correctamente!", tags });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el deleteTags." });

    }
}