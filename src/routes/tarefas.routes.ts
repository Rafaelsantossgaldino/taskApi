import express from "express";
import { authenticateToken } from "../utils/auth";
import { createTarefa, deleteTarefa, listTarefaByEmpresa, updateTarefa } from "../tarefas/controllers/tarefasController";

const tarefas = express.Router();

tarefas.post("/created", createTarefa);
tarefas.get("/list_tarefa_by_empresa/:empresaId", listTarefaByEmpresa);
tarefas.put("/update_tarefa/:id", updateTarefa);
tarefas.delete("/delete_tarefa/:id", deleteTarefa);

export default tarefas;