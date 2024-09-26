import { ITarefaService, Tarefa } from "../interfaces/Tarefa";
import { TarefaRepository } from "../repositories/TarefaRepository";

export class TarefaService implements ITarefaService {
  private tarefaRepository = new TarefaRepository();

  async createTarefa(data: Tarefa): Promise<Tarefa> {
    if (!data.titulo || typeof data.titulo !== "string") {
      throw new Error("Parametro titulo é obrigatório e deve ser uma string");
    }

    if (!data.descricao || typeof data.descricao !== "string") {
      throw new Error("Parametro descricao é obrigatório e deve ser uma string");
    }

    if (!data.status || !["PENDENTE", "EM_PROGRESSO", "CONCLUIDO"].includes(data.status)) {
      throw new Error("Parametro status é obrigatório e só pode ser PENDENTE, EM_PROGRESSO ou CONCLUIDO");
    }

    if (!data.prazo) {
      throw new Error("Parametro prazo é obrigatório");
    }

    const tarefa = await this.tarefaRepository.create(data);
    return tarefa;
  }

  async listTarefaByEmpresa(empresaId: string): Promise<Tarefa[]> {
    return this.tarefaRepository.findByEmpresaId(empresaId);
  }

  async updateTarefa(id: string, data: Partial<Tarefa>): Promise<Tarefa> {
    // Adicionar validações de campos se necessário
    return this.tarefaRepository.update(id, data);
  }

  async deleteTarefa(id: string): Promise<Tarefa> {
    return this.tarefaRepository.delete(id);
  }
}