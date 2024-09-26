import express from "express";
import { create, list, remove, update } from "../empresas/controllers/empresaController";
import { authenticateToken } from "../utils/auth";

const empresa = express.Router();

empresa.post("/created", authenticateToken, create);
empresa.get("/list_all",  list);
empresa.put("/update/:id", update);
empresa.delete("/delete/:id", authenticateToken, remove);

export default empresa;