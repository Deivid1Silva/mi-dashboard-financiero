/*
  Warnings:

  - You are about to drop the `Movement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_userId_fkey";

-- DropTable
DROP TABLE "Movement";

-- CreateTable
CREATE TABLE "movement" (
    "id" TEXT NOT NULL,
    "concept" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "MovementType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
