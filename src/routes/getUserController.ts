import { Request, Response } from "express";
import prisma from '../prisma';

export default async function getUserController(req: Request, res: Response) {
    try {
        const userId = req.body.userId;
        
        const userLog = await prisma.user.findFirst({
            where: {
                userId: Number(userId),
            },
        });

        res.status(200).send({ userLog });

    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante la busqueda." });

    }
}