import { Request, Response } from "express";
import deleteToken from "../utils/deleteToken";
import tokenValidation from "../utils/tokenValidation";

export default async function logOutController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;

        const tokenValid = await tokenValidation(token);
        if(!tokenValid){
            res.status(400).send({
                error: true,
                "result": "Token invalido.",
            });
            return;
        }
        const deletedToken = await deleteToken(token);

        res.status(200).send({ "result": "Sesión cerrada correctamente." });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el log-out." });

    }
}