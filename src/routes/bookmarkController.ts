import { Request, Response } from "express";
import prisma from '../prisma';

export default async function bookmarkController(req: Request, res: Response) {
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

        
        if(req.body.bookmark === undefined){
            res.status(400).send({ "result": "Falta la acción a realizar!" });
        }

        if(req.body.bookmark === true){
            const bookmark = await prisma.bookmark.create({
                data: {
                    userId: userId,
                    drawId: drawId,
                },
            });

            res.status(200).send({ "result": "Bookmark agregado!", "bookmark": true });
        }
        else {
            const bookmark = await prisma.bookmark.deleteMany({
                where: {
                    userId: userId,
                    drawId: drawId,
                },
            });

            res.status(200).send({ "result": "Bookmark removido!", "bookmark": false });
        }
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el setBookmark." });

    }
}