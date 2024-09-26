export interface IEmpresaRepository {
  create(nome: string, cnpj: string): Promise<any>;
  findAll(): Promise<any[]>;
  update(id: string, data: { nome: string; cnpj: string }): Promise<any>;
  remove(id: string): Promise<any>;
}