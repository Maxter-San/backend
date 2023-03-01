import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaStudioMiddleware } from 'express-prisma-studio';
import prisma from './prisma';
import routes from './routes';

const PORT = Number(process.env.PORT || 8080);

async function main() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/prisma', PrismaStudioMiddleware(prisma));
    app.use(routes);
  
    app.listen(PORT, () => {
      const host = `http://localhost:${PORT}/`;
      console.log(`Backend listo: ${host}`);
    });
  }
  
  main();

//npm run build
//npm run start