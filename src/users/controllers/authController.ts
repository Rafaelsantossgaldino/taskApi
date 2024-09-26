import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken, login as loginService } from "../../utils/auth";


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Parametro email é obrigatório" });
  }

  if (!password) {
    return res.status(400).json({ message: "Parametro password é obrigatório" });
  }

  try {
    const { user, token } = await loginService(email, password);
    res.json({ user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const adminAccess = (req: any, res: Response) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Acesso restrito a admins" });
  }
  res.json({ message: "Bem-vindo, admin!" });
};