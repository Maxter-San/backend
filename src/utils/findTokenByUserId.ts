import prisma from "../prisma";

export default async function findTokenByUserId(userId:number) {
    const tokenLog = await prisma.tokenLog.findFirst({
        where: {
            userId: userId
        },
    });
    
    return tokenLog;
}