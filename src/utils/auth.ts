import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

// Função para gerar JWT baseado nas roles do usuário
export const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Middleware para autenticar a requisição
export const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Acesso negado! Usuário não tem permissões." });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido!" });
  }
};

// Função para login
export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Credenciais inválidas!");
  }

  const token = generateToken(user);
  return { user, token };
};