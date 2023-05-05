import prisma from "../prisma";
import TokenGenerator from "../tokenGenerator";

export default async function createToken(userId:number, isTemp:boolean) {
    var token = TokenGenerator.generate();
    const newToken = await prisma.tokenLog.create({
        data: {
            token: token,
            userId: userId,
            temporal: isTemp,
        },
    });
    
    return newToken.token;
}