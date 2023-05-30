import { Request, Response } from "express";
import prisma from '../prisma';

export default async function drawsController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = req.query.userId;
        const conditions = [];
        const filter = [];
        const limit = Number(req.query.limit) || undefined;

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

        //if (req.query.name) {
        //    conditions.push({
        //        name: {
        //            contains: req.query.search as any || undefined,
        //        },
        //    });
        //}
        if (req.query.filterUSerId) {
            conditions.push({
                userId: Number(req.query.filterUSerId),
            });
        }

        if (req.query.search) {
            filter.push(
                {title: {contains:  req.query.search as any || undefined}},
                {drawTag: {
                    some: {
                        tagName:{
                            contains: req.query.search as any || undefined,
                        },
                    },
                },},
            );
        }

        const draws = await prisma.draw.findMany({
            where: {
                AND: conditions.length ? conditions : undefined,
                OR: filter.length ? filter : undefined,
            },
            orderBy: {
                creationDate: req.query.orderBy as any || undefined,
            },
            take: limit,
        });

        res.status(200).send({ "result": "Obtener dibujos funciona correctamente!", draws });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el getDraws." });

    }
}