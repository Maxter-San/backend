import prisma from "../prisma";

export default async function deleteToken(token:string) {
    const deletedToken = await prisma.tokenLog.delete({
        where: {
          token: token,
        },
    });
    
    return deletedToken;
}