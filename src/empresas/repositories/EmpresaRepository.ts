import { PrismaClient } from "@prisma/client";
import { IEmpresaRepository } from "../interfaces/IEmpresaRepository";

const prisma = new PrismaClient();

export class EmpresaRepository implements IEmpresaRepository {
  async create(nome: string, cnpj: string): Promise<any> {
    try {
      return await prisma.empresa.create({
        data: { nome, cnpj },
      });
    } catch (error) {
      throw new Error("Erro ao criar empresa no banco de dados");
    }
  }

  async findAll(): Promise<any[]> {
    try {
      return await prisma.empresa.findMany();
    } catch (error) {
      throw new Error("Erro ao listar empresas no banco de dados");
    }
  }

  async update(id: string, data: { nome: string; cnpj: string }): Promise<any> {
    try {
      return await prisma.empresa.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error("Erro ao atualizar empresa no banco de dados");
    }
  }

  async remove(id: string): Promise<any> {
    try {
      return await prisma.empresa.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Erro ao remover empresa no banco de dados");
    }
  }
}