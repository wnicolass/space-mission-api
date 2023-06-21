/*
  Warnings:

  - A unique constraint covering the columns `[planetName]` on the table `Planet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Planet_planetName_key" ON "Planet"("planetName");
