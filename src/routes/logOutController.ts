import { Request, Response } from "express";
import deleteToken from "../utils/deleteToken";

export default async function logOutController(req: Request, res: Response) {
    try {
        const deletedToken = await deleteToken(req.body.token);

        res.status(200).send({ "result": "Sesión cerrada correctamente." });

    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el log-out." });

    }
}