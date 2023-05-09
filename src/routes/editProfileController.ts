import { Request, Response } from "express";
import prisma from '../prisma';
import tokenValidation from "../utils/tokenValidation";

export default async function editProfileController(req: Request, res: Response) {
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

        const newData = {
            profilePhoto: req.body.profilePhoto || undefined,
            coverPhoto: req.body.coverPhoto || undefined,
            description: req.body.description || undefined,
            name: req.body.name,
            password: req.body.password || undefined,
            gender: req.body.gender,
            paypalLink: req.body.paypalLink || undefined,
            twitterLink: req.body.twitterLink || undefined,
            facebookLink: req.body.facebookLink || undefined,
        };
        
        const newUser = await prisma.user.update({
            where: {
                userId: Number(userId),
            },
            data: newData,
        });
;
        res.status(200).send({ newUser, "result": "¡Usuario modificado con exito!" });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el editProfile." });

    }
}