import express from "express";
import { login, adminAccess, } from "../users/controllers/authController";
import { authenticateToken } from "../utils/auth";

const router = express.Router();

// Rota para login
router.post("/login", login);

// Rota protegida, disponível apenas para admins
router.get("/admin", authenticateToken, adminAccess);

export default router;