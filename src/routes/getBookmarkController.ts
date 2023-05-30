import { Request, Response } from "express";
import prisma from '../prisma';

export default async function getBookmarkController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = Number(req.query.userId);
        const drawId = Number(req.query.drawId);

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

        const bookmark = await prisma.bookmark.findFirst({
            where: {
                userId: userId,
                drawId: drawId,
            },
        });

        if(bookmark){
            res.status(200).send({ "result": "Bookmark existente!", "bookmark": true });
        }
        else {
            res.status(200).send({ "result": "Bookmark no existente!", "bookmark": false });
        }
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el getBookmark." });

    }
}