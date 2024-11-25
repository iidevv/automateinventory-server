import express, { Request, Response } from 'express';
import { prisma } from './models/prisma';
import passport from 'passport';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT || 3001;


async function main() {
    app.use(cors({
        origin: process.env.FRONTEND_URL || '',
        credentials: true,
    }));
    app.use(express.json());

    app.use(passport.initialize());

    app.use('/auth', authRoutes);

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });