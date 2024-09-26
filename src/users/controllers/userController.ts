import { Request, Response } from "express";
import { UsuarioService } from "../services/UserService";

const usuarioService = new UsuarioService();

export const register = async (req: Request, res: Response) => {
  const { email, name, password, role, empresaId } = req.body;

  try {
    const user = await usuarioService.registerUser(email, name, password, role, empresaId);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const listUsersByEmpresa = async (req: Request, res: Response) => {
  const { empresaId } = req.params;

  try {
    const users = await usuarioService.listUsersByEmpresa(empresaId);
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};