import { Request, Response } from "express";
import prisma from '../prisma';
import uploadFile from '../utils/uploadFile';

export default async function uploadFileController(req: Request, res: Response) {
    if(!req.file){
        res.status(500).send({
            error: true,
            "result": "archivo requerido",
        });
        return;
    }

    try {
    const url = await uploadFile(
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname,
    )
    res.send(url);
    } catch (error) {
    res.status(500).send(error);
    }
};
  