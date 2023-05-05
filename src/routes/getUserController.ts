import { Request, Response } from "express";
import prisma from '../prisma';
import tokenValidation from "../utils/tokenValidation";

export default async function getUserController(req: Request, res: Response) {
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

        const userId = req.body.userId;
        
        const userLog = await prisma.user.findFirst({
            where: {
                userId: Number(userId),
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

        //userLog.tokenLog.creationDate

        if(userLog.tokenLog[0].temporal === true){
            const dateNow = new Date(Date.now());
            const dateCreation = userLog.tokenLog[0].creationDate;
            dateCreation.setDate(dateCreation.getDay() + 1);

            if(dateNow >= dateCreation){
                res.status(400).send({
                    error: true,
                    "result": "Sesión expirada.",
                });
                return;
            }
        }

        res.status(200).send({ "userLog" : userLog });

    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante la busqueda." });

    }
}