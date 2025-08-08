/*
  Warnings:

  - Added the required column `text` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "text" TEXT NOT NULL;
