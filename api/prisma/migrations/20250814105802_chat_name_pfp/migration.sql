-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "name" TEXT,
ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "public"."Message" ALTER COLUMN "type" SET DEFAULT 'DEFAULT';
