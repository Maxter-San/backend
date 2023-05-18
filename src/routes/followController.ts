import { Request, Response } from "express";
import prisma from '../prisma';

export default async function followController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = Number(req.body.userId);
        const followedUserId = Number(req.body.followedUserId);

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

        if(req.body.follow === undefined){
            res.status(400).send({ "result": "Falta la acción a realizar!" });
        }

        if(req.body.follow === true){
            const follow = await prisma.followUser.create({
                data: {
                    followerId: userId,
                    followedUserId: followedUserId,
                },
            });

            res.status(200).send({ "result": "Seguiste a un usuario!", "follow": true });
        }
        else {
            const follow = await prisma.followUser.delete({
                where: {
                    followerId_followedUserId: {
                        followerId: userId,
                        followedUserId: followedUserId,
                    },
                }
            });

            res.status(200).send({ "result": "Dejaste de seguir!", "follow": false });
        }

    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el followUser." });

    }
}