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
      let totalJogadores = 0;
      let totalEspectadores = 0;
      let totalConfirmados = 0;

      quadra.agendamentos.forEach((agendamento) => {
        agendamento.usuarios.forEach((usuario) => {
          if (usuario.tipoParticipacao === "JOGADOR") {
            totalJogadores++;
          } else if (usuario.tipoParticipacao === "ESPECTADOR") {
            totalEspectadores++;
          }
          totalConfirmados++;
        });
      });

      return {
        id: quadra.id,
        nome: quadra.nome,
        localizacao: quadra.localizacao,
        imagemUrl: quadra.imagemUrl,
        totalConfirmados,
        totalJogadores,
        totalEspectadores,
      };
    });

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar quadras:", error);
    throw error;
  }
}

// Função alternativa - apenas jogadores confirmados
export async function getQuadrasComJogadores() {
  try {
    const quadras = await prisma.quadra.findMany({
      include: {
        agendamentos: {
          include: {
            usuarios: {
              where: {
                confirmado: true,
                tipoParticipacao: "JOGADOR",
              },
            },
          },
        },
      },
    });

    const resultado = quadras.map((quadra) => {
      const totalJogadores = quadra.agendamentos.reduce((acc, agendamento) => {
        return acc + agendamento.usuarios.length;
      }, 0);

      return {
        id: quadra.id,
        nome: quadra.nome,
        localizacao: quadra.localizacao,
        imagemUrl: quadra.imagemUrl,
        totalJogadores,
      };
    });

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar quadras:", error);
    throw error;
  }
}

// Função mais detalhada (VIP) - retorna dados completos por agendamento
export async function getQuadrasComDetalhesParticipacao() {
  try {
    const quadras = await prisma.quadra.findMany({
      include: {
        agendamentos: {
          include: {
            usuarios: {
              where: { confirmado: true },
              include: {
                usuario: {
                  select: {
                    id: true,
                    nome: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const resultado = quadras.map((quadra) => {
      const agendamentosDetalhados = quadra.agendamentos.map((agendamento) => {
        const jogadores = agendamento.usuarios
          .filter((u) => u.tipoParticipacao === "JOGADOR")
          .map((u) => u.usuario);

        const espectadores = agendamento.usuarios
          .filter((u) => u.tipoParticipacao === "ESPECTADOR")
          .map((u) => u.usuario);

        return {
          id: agendamento.id,
          horarioInicio: agendamento.horarioInicio,
          horarioFim: agendamento.horarioFim,
          jogadores,
          espectadores,
          totalJogadores: jogadores.length,
          totalEspectadores: espectadores.length,
        };
      });

      const totalJogadores = agendamentosDetalhados.reduce(
        (acc, ag) => acc + ag.totalJogadores,
        0
      );
      const totalEspectadores = agendamentosDetalhados.reduce(
        (acc, ag) => acc + ag.totalEspectadores,
        0
      );

      return {
        id: quadra.id,
        nome: quadra.nome,
        localizacao: quadra.localizacao,
        imagemUrl: quadra.imagemUrl,
        totalJogadores,
        totalEspectadores,
        totalConfirmados: totalJogadores + totalEspectadores,
        agendamentos: agendamentosDetalhados,
      };
    });

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar quadras:", error);
    throw error;
  }
}
