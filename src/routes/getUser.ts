import { Request, Response } from "express";
import prisma from '../prisma';

export default async function getUserController(req: Request, res: Response) {
    try {
        const userId = req.query.userId;
        
        const user = await prisma.user.findFirst({
            where: {
                userId: Number(userId),
                isActive: true,
            },
            include: {
                followedUser: true,
            },
        });
        
        if(!user){
            res.status(400).send({
                error: true,
                "result": "Usuario no encontrado.",
            });
            return;
        }

        res.status(200).send({ "user" : user });

    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante la busqueda." });

    }
}