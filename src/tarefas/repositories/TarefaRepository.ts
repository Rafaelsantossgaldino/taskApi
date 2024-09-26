import { PrismaClient } from "@prisma/client";
import { ITarefaRepository, Tarefa } from "../interfaces/Tarefa";

const prisma = new PrismaClient();

export class TarefaRepository implements ITarefaRepository {
  async create(tarefa: Tarefa): Promise<Tarefa> {
    const createdTarefa = await prisma.tarefa.create({
      data: {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao ?? "",  // Garantir que descricao não seja null
        status: tarefa.status,
        prazo: tarefa.prazo,
        empresa: { connect: { id: tarefa.empresaId } },
      },
    });

    return {
      ...createdTarefa,
      descricao: createdTarefa.descricao ?? "",  // Garantir que descricao não seja null
    };
  }

  async findByEmpresaId(empresaId: string): Promise<Tarefa[]> {
    const tarefas = await prisma.tarefa.findMany({
      where: { empresaId },
    });

    return tarefas.map(tarefa => ({
      ...tarefa,
      descricao: tarefa.descricao ?? "",  // Garantir que descricao não seja null
    }));
  }

  async update(id: string, tarefa: Partial<Tarefa>): Promise<Tarefa> {
    const updatedTarefa = await prisma.tarefa.update({
      where: { id },
      data: {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao ?? "",  // Garantir que descricao não seja null
        status: tarefa.status,
        prazo: tarefa.prazo,
      },
    });

    return {
      ...updatedTarefa,
      descricao: updatedTarefa.descricao ?? "",  // Garantir que descricao não seja null
    };
  }

  async delete(id: string): Promise<Tarefa> {
    return prisma.tarefa.delete({
      where: { id },
    });
  }
}