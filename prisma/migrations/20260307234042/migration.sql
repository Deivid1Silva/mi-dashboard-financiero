/*
  Warnings:

  - Changed the type of `type` on the `movement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "movement" DROP COLUMN "type",
ADD COLUMN     "type" "MovementType" NOT NULL;
