import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../repositories/UsersRepository";
import { Role } from "@prisma/client"; // Importe o enum Role

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async registerUser(email: string, name: string, password: string, role: Role, empresaId?: string) {
    if (!name || typeof name !== "string") {
      throw new Error("Parametro name é obrigatório e deve ser uma string");
    }

    if (!email || typeof email !== "string") {
      throw new Error("Parametro email é obrigatório e deve ser uma string");
    }

    if (!password || password.length < 6) {
      throw new Error("A senha deve ter no mínimo 6 caracteres");
    }

    if (role !== Role.USER && role !== Role.ADMIN) {
      throw new Error("Role deve ser USER ou ADMIN");
    }

    // Verifica se o role é USER, então empresaId é obrigatório
    if (role === Role.USER) {
      if (!empresaId || typeof empresaId !== "string") {
        throw new Error("Parametro empresaId é obrigatório para usuários com role USER");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usuarioRepository.create(email, name, hashedPassword, role, empresaId);
  }

  async listUsersByEmpresa(empresaId: string) {
    if (!empresaId) {
      throw new Error("Parametro empresaId é obrigatório");
    }

    return await this.usuarioRepository.findByEmpresaId(empresaId);
  }
}