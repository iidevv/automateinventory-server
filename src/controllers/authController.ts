import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../models/prisma';

const ERROR_MESSAGE = "Your username and password don't match. Please try again.";

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
        
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(403).json({ message: ERROR_MESSAGE });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: ERROR_MESSAGE });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || '',
        { expiresIn: '1h' }
    );

    return res.json({ token });
};

export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
        return res.status(404).json({ message: 'User already exist!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })

    return res.json({ newUser });
}