/*
  Warnings:

  - You are about to drop the `Agendamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quadras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Agendamentos" DROP CONSTRAINT "Agendamentos_quadraId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsuariosAgendamentos" DROP CONSTRAINT "UsuariosAgendamentos_agendamentoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsuariosAgendamentos" DROP CONSTRAINT "UsuariosAgendamentos_usuarioId_fkey";

-- DropTable
DROP TABLE "public"."Agendamentos";

-- DropTable
DROP TABLE "public"."Quadras";

-- DropTable
DROP TABLE "public"."Usuarios";

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Quadra" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT,
    "imagemUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quadra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Agendamento" (
    "id" SERIAL NOT NULL,
    "quadraId" INTEGER NOT NULL,
    "horarioInicio" TIMESTAMP(3) NOT NULL,
    "horarioFim" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Agendamento" ADD CONSTRAINT "Agendamento_quadraId_fkey" FOREIGN KEY ("quadraId") REFERENCES "public"."Quadra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsuariosAgendamentos" ADD CONSTRAINT "UsuariosAgendamentos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsuariosAgendamentos" ADD CONSTRAINT "UsuariosAgendamentos_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "public"."Agendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
