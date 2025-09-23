-- CreateEnum
CREATE TYPE "public"."TipoParticipacao" AS ENUM ('JOGADOR', 'ESPECTADOR');

-- AlterTable
ALTER TABLE "public"."UsuariosAgendamentos" ADD COLUMN     "tipoParticipacao" "public"."TipoParticipacao" NOT NULL DEFAULT 'JOGADOR';
