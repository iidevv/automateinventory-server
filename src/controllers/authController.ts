import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../models/prisma";

const LOGIN_ERROR_MESSAGE =
  "Your username and password don't match. Please try again.";

interface SignInRequestBody {
  email: string;
  password: string;
}
interface SignUpRequestBody {
  email: string;
  password: string;
  companyName: string;
  companyWebsite: string;
  phoneNumber: string;
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password }: SignInRequestBody = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(403).json({ message: LOGIN_ERROR_MESSAGE });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: LOGIN_ERROR_MESSAGE });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );

  return res.json({ token });
};

export const signUp = async (req: Request, res: Response) => {
  const {
    email,
    password,
    companyName,
    companyWebsite,
    phoneNumber,
  }: SignUpRequestBody = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return res.status(400).json({ message: "User already exist!" });
  }

  const instance = await prisma.instance.findFirst({
    where: {
      OR: [{ companyName }, { companyWebsite }, { phoneNumber }],
    },
  });

  if (instance) {
    return res.status(400).json({ message: "User already exist!" });
  }

  const newInstance = await prisma.instance.create({
    data: {
      companyName,
      companyWebsite,
      phoneNumber,
    },
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      instanceId: newInstance.id,
      email: email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );

  return res.json({ token });
};
