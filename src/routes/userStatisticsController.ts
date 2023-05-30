import { Request, Response } from "express";
import prisma from '../prisma';

export default async function userStatisticsController(req: Request, res: Response) {
    try {
        const userStatistics = await prisma.user.findFirst({
            where: {
                userId: Number(req.query.userId),
            },
            select: {
                _count: {
                    select: {
                        draws: {
                            where:{
                                isActive: true
                            },
                        },
                        followerUser: true,
                        followedUser: true,
                    },
                },
            },
        });

        res.status(200).send({ "result": "Obtener estadisticas funciona correctamente!", userStatistics });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el getStatistics." });

    }
}