"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_prisma_studio_1 = require("express-prisma-studio");
const prisma_1 = __importDefault(require("./prisma"));
const routes_1 = __importDefault(require("./routes"));
const PORT = Number(process.env.PORT || 8080);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.use('/prisma', (0, express_prisma_studio_1.PrismaStudioMiddleware)(prisma_1.default));
        app.use(routes_1.default);
        app.listen(PORT, () => {
            const host = `http://localhost:${PORT}/`;
            console.log(`Backend listo: ${host}`);
        });
    });
}
main();
//npm run build
//npm run start
