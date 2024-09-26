import { Request, Response } from "express";
import { EmpresaService } from "../services/EmpresaService";

const empresaService = new EmpresaService();

export const create = async (req: Request, res: Response) => {
  const { nome, cnpj } = req.body;
  
  try {
    const empresa = await empresaService.createEmpresa(nome, cnpj);
    return res.status(201).json(empresa);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const empresas = await empresaService.listEmpresas();
    return res.status(200).json(empresas);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar empresas" });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, cnpj } = req.body;

  try {
    const empresa = await empresaService.updateEmpresa(id, { nome, cnpj });
    return res.status(200).json(empresa);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await empresaService.removeEmpresa(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};