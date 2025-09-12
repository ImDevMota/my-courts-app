import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const usuarioLogado = await prisma.usuario.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    if (!usuarioLogado) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const quadras = await getQuadrasComConfirmacoes();

    if (!usuarios || !quadras) {
      res.status(500).json({ message: "Erro impossível carregar página" });
    }

    res.status(200).json(usuarioLogado, quadras);
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
});

router.get("/perfil", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
});

export default router;
