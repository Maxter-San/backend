import { Request, Response } from "express";
import prisma from '../prisma';
import tokenValidation from "../utils/tokenValidation";

export default async function deleteCommentController(req: Request, res: Response) {
    try {
        const token = req.headers.token as any;
        const userId = Number(req.body.userId);
        const drawId = Number(req.body.drawId);
        const commentId = Number(req.body.commentId);
        
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

        const comment = await prisma.comment.findFirst({
            where: {
                commentId: commentId,
                userId: userId,
                drawId: drawId,
            },
        });

        if(!comment){
            res.status(400).send({
                error: true,
                "result": "Comentario no encontrado.",
            });
            return;
        }

        const deletedComment = await prisma.comment.delete({
            where: {
                commentId: comment.commentId,
            },
        });

        res.status(200).send({ "result": "Comentario borrado correctamente!", deletedComment });
    }
    catch {
        res.status(500).send({ error: true, "result": "Ocurrió un error durante el deleteComment." });

    }
}