import { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";
import { Tarefa } from "../interfaces/Tarefa";

const tarefaService = new TarefaService();

export const createTarefa = async (req: Request, res: Response) => {
  const { titulo, descricao, status, prazo, empresaId } = req.body;

  try {
    const tarefa: Tarefa = {
      titulo,
      descricao,
      status,
      prazo: new Date(prazo.split("/").reverse().join("-")),
      empresaId
    };

    const newTarefa = await tarefaService.createTarefa(tarefa);
    return res.status(201).json(newTarefa);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const listTarefaByEmpresa = async (req: Request, res: Response) => {
  const { empresaId } = req.params;

  try {
    const tarefas = await tarefaService.listTarefaByEmpresa(empresaId);
    res.json(tarefas);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTarefa = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descricao, status, prazo } = req.body;

  try {
    const updatedTarefa = await tarefaService.updateTarefa(id, { titulo, descricao, status, prazo });
    res.json(updatedTarefa);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTarefa = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTarefa = await tarefaService.deleteTarefa(id);
    res.json(deletedTarefa);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};