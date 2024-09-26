import { PrismaClient, Role } from "@prisma/client";
import { IUsuarioRepository } from "../interfaces/IUsersRepository";

const prisma = new PrismaClient();

export class UsuarioRepository implements IUsuarioRepository {
  async create(email: string, name: string, password: string, role: Role, empresaId?: string): Promise<any> {
    try {
      if (empresaId) {
        // Se empresaId for fornecido, conecte à empresa
        return await prisma.user.create({
          data: {
            email,
            name,
            password,
            role,
            empresa: { connect: { id: empresaId } },
          },
        });
      } else {
        // Se não houver empresaId, crie o usuário sem empresa
        return await prisma.user.create({
          data: {
            email,
            name,
            password,
            role,
          },
        });
      }
    } catch (error) {
      throw new Error("Erro ao criar usuário no banco de dados");
    }
  }

  async findByEmpresaId(empresaId: string): Promise<any[]> {
    try {
      return await prisma.user.findMany({
        where: { empresaId },
        include: {
          empresa: {
            include: {
              tarefas: true, // Inclui as tarefas da empresa do usuário
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Erro ao listar usuários no banco de dados");
    }
  }
}