/*
  Warnings:

  - You are about to drop the `Agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quadra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Agendamento" DROP CONSTRAINT "Agendamento_quadraId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsuariosAgendamentos" DROP CONSTRAINT "UsuariosAgendamentos_agendamentoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsuariosAgendamentos" DROP CONSTRAINT "UsuariosAgendamentos_usuarioId_fkey";

-- DropTable
DROP TABLE "public"."Agendamento";

-- DropTable
DROP TABLE "public"."Quadra";

-- DropTable
DROP TABLE "public"."Usuario";

-- CreateTable
CREATE TABLE "public"."Usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Quadras" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT,
    "imagemUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quadras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Agendamentos" (
    "id" SERIAL NOT NULL,
    "quadraId" INTEGER NOT NULL,
    "horarioInicio" TIMESTAMP(3) NOT NULL,
    "horarioFim" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "public"."Usuarios"("email");

-- AddForeignKey
ALTER TABLE "public"."Agendamentos" ADD CONSTRAINT "Agendamentos_quadraId_fkey" FOREIGN KEY ("quadraId") REFERENCES "public"."Quadras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsuariosAgendamentos" ADD CONSTRAINT "UsuariosAgendamentos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsuariosAgendamentos" ADD CONSTRAINT "UsuariosAgendamentos_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "public"."Agendamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
