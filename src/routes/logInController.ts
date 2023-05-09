import { Request, Response } from "express";
import prisma from '../prisma';
import createToken from "../utils/newToken";
//import findTokenByUserId from "../utils/findTokenByUserId";

export default async function logInController(req: Request, res: Response) {
    try {
        const userLog = await prisma.user.findFirst({
            where: {
                userName: req.body.userName,
                password: req.body.password,
            },
        });

        if(!userLog){
            res.status(400).send({
                error: true,
                "result": "Usuario o contraseña incorrectos.",
            });
            return;
        }

        if(!userLog.isActive){
            res.status(400).send({
                error: true,
                "result": "Usuario eliminado.",
            });
            return;
        }

        /*if(await findTokenByUserId(userLog.userId) !== null){
            res.status(400).send({
                error: true,
                "result": "Usuario ya logeado.",
            });
            return;
        }*/

        const token = await createToken(userLog.userId, req.body.isTemp);

        const user = {"userId" : userLog.userId, "token" : token};

        res.status(200).send({ user });

    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el log-in." });

    }
}