import express, { Request, Response } from 'express';
import { prisma } from './models/prisma';
import passport from 'passport';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 3001;


async function main() {
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