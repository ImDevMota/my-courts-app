import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getQuadrasComConfirmacoes() {
  try {
    const quadras = await prisma.quadra.findMany({
      include: {
        agendamentos: {
          include: {
            usuarios: {
              where: { confirmado: true },
            },
          },
        },
      },
    });

    const resultado = quadras.map((quadra) => {
      const totalConfirmados = quadra.agendamentos.reduce(
        (acc, agendamento) => {
          return acc + agendamento.usuarios.length;
        },
        0
      );

      return {
        id: quadra.id,
        nome: quadra.nome,
        localizacao: quadra.localizacao,
        imagemUrl: quadra.imagemUrl,
        totalConfirmados,
      };
    });

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar quadras:", error);
    throw error;
  }
}
