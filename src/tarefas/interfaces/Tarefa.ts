export interface Tarefa {
  id?: string;
  titulo: string;
  descricao: string | null;
  status: "PENDENTE" | "EM_PROGRESSO" | "CONCLUIDO";
  prazo: Date;
  empresaId: string;
}

export interface ITarefaRepository {
  create(tarefa: Tarefa): Promise<Tarefa>;
  findByEmpresaId(empresaId: string): Promise<Tarefa[]>;
  update(id: string, tarefa: Partial<Tarefa>): Promise<Tarefa>;
  delete(id: string): Promise<Tarefa>;
}

export interface ITarefaService {
  createTarefa(data: Tarefa): Promise<Tarefa>;
  listTarefaByEmpresa(empresaId: string): Promise<Tarefa[]>;
  updateTarefa(id: string, data: Partial<Tarefa>): Promise<Tarefa>;
  deleteTarefa(id: string): Promise<Tarefa>;
}