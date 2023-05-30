import { Request, Response } from "express";
import prisma from '../prisma';
import tokenValidation from "../utils/tokenValidation";

export default async function updateArtworkController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = Number(req.body.userId);
        const drawId = Number(req.body.drawId);
        
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

        const artwork = await prisma.draw.findFirst({
            where: {
                userId: userId,
                drawId: drawId,
            },
        });

        if(!artwork){
            res.status(400).send({
                error: true,
                "result": "Dibujo no encontrado.",
            });
            return;
        }

        const modifiedArtwork = await prisma.draw.update({
            data: {
                title: req.body.title,
                description: req.body.description,
                restrict18: req.body.restrict18,
                isPublic: req.body.isPublic,
            },
            where: {
                drawId: drawId,
            },
        });

        res.status(200).send({ "result": "Dibujo modificado correctamente!", modifiedArtwork });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el updateDrawing." });

    }
}