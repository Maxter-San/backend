import { Request, Response } from "express";
import prisma from '../prisma';

export default async function drawController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = req.query.userId;
        const drawId = Number(req.query.drawId);
        const conditions = [];

        conditions.push({
            isActive: true,
        });
        
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

        let fechaNacimiento = new Date(userLog.birthDate);
        var today = new Date();
        let edad = today.getFullYear() - fechaNacimiento.getFullYear();
        if (fechaNacimiento.getMonth() > (today.getMonth()) || fechaNacimiento.getDay() > today.getDay()){
            edad--;
        }

        if(edad < 18){
            conditions.push({
                restrict18: false,
            });
        }

        conditions.push({
            drawId: drawId,
        });

        const draw = await prisma.draw.findFirst({
            where: {
                AND: conditions.length ? conditions : undefined,
            },
            include: {
                user: true,
                drawTag: true,
            },
        });

        res.status(200).send({ "result": "Obtener dibujo funciona correctamente!", draw });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el getDraw." });

    }
}