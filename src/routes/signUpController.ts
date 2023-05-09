import { Request, Response } from "express";
import prisma from '../prisma';
import createToken from "../utils/newToken";

export default async function signUpController(req: Request, res: Response) {
    try {
        const existentEmail = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        
        if(existentEmail){
            res.status(400).send({
                error: true,
                "result": "Email ya registrado",
            });
            return;
        }

        const existentUserName = await prisma.user.findFirst({
            where: {
                userName: req.body.userName,
            },
        });
        if(existentUserName){
            res.status(400).send({
                error: true,
                "result": "Nombre de usuario ya registrado",
            });
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email,
                profilePhoto: req.body.profilePhoto,
                coverPhoto: req.body.coverPhoto,
                name: req.body.name,
                gender: req.body.gender,
                birthDate: req.body.birthDate,
            }
        });

        const token = await createToken(newUser.userId, false);

        const user = { "userId" : newUser.userId, "token" : token }

        //res.send({ "result": "Usuario agregado con exito" });
        res.status(200).send({ user, "result": "¡Usuario agregado con exito!" });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el sign-up." });

    }
}