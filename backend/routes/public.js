import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userEmailExists = await prisma.usuario.findUnique({
      where: { email: user.email },
    });

    if (userEmailExists) {
      return res
        .status(500)
        .json({ message: "E-mail já cadastrado no servidor." });
    }

    const userDB = await prisma.usuario.create({
      data: {
        nome: user.name,
        email: user.email,
        senhaHash: hashPassword,
      },
    });

    res.status(200).json(userDB);
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    const user = await prisma.usuario.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(userInfo.password, user.senhaHash);

    if (!isMatch) {
      return res.status(404).json({ message: "Senha Inválida" });
    }

    // redirecionar para a rota certa (caso for admin ou user)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
});

export default router;
