import express from "express";
import { authenticateToken } from "../utils/auth";
import { listUsersByEmpresa, register } from "../users/controllers/userController";

const user = express.Router();

// Rota para registro de usuário
// @ts-ignore
user.post("/register_user", register);

// Rota para listar usuários por empresa
// @ts-ignore
user.get("/userByEmpresa/:empresaId", listUsersByEmpresa);


export default user;