/*
  Warnings:

  - Added the required column `concept` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "concept" TEXT NOT NULL;
