import { EmpresaRepository } from "../repositories/EmpresaRepository";

export class EmpresaService {
  private empresaRepository: EmpresaRepository;

  constructor() {
    this.empresaRepository = new EmpresaRepository();
  }

  async createEmpresa(nome: string, cnpj: string) {
    if (!nome || typeof nome !== "string") {
      throw new Error("Parametro nome é obrigatório e deve ser uma string");
    }
    
    if (!cnpj || typeof cnpj !== "string") {
      throw new Error("Parametro cnpj é obrigatório e deve ser uma string");
    }

    return await this.empresaRepository.create(nome, cnpj);
  }

  async listEmpresas() {
    return await this.empresaRepository.findAll();
  }

  async updateEmpresa(id: string, data: { nome: string; cnpj: string }) {
    if (!id) {
      throw new Error("Parametro id é obrigatório");
    }

    if (!data.nome || typeof data.nome !== "string") {
      throw new Error("Parametro nome é obrigatório e deve ser uma string");
    }
    
    if (!data.cnpj || typeof data.cnpj !== "string") {
      throw new Error("Parametro cnpj é obrigatório e deve ser uma string");
    }

    return await this.empresaRepository.update(id, data);
  }

  async removeEmpresa(id: string) {
    if (!id) {
      throw new Error("Parametro id é obrigatório");
    }

    return await this.empresaRepository.remove(id);
  }
}