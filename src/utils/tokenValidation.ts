import prisma from "../prisma";
import TokenGenerator from "../tokenGenerator";

export default async function tokenValidation(token:string) {
    return TokenGenerator.isValid( token );
}