export interface IUsuarioRepository {
  create(email: string, name: string, password: string, role: string, empresaId: string): Promise<any>;
  findByEmpresaId(empresaId: string): Promise<any[]>;
}