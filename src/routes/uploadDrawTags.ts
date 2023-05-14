import { Request, Response } from "express";
import prisma from '../prisma';
import tokenValidation from "../utils/tokenValidation";

export default async function uploadDrawTagsController(req: Request, res: Response) {
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

        const drawId = Number(req.body.drawId);

        const tag = await prisma.tag.upsert({
            where: {
                tagName: req.body.tagName,
            },
            update: {
                tagName: req.body.tagName,
            },
            create: {
                tagName: req.body.tagName,
            },
        });

        const drawTag = await prisma.drawTag.create({
            data: {
                drawId: drawId,
                tagName: tag.tagName,
            },
        });

        res.status(200).send({ "result": "Tag agregado!", tag, drawTag });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el upload draw tag." });

    }
}