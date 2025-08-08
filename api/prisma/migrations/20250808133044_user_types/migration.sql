-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('MEMBER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "type" "public"."UserType" NOT NULL DEFAULT 'MEMBER';
