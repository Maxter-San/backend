/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Tag` table. All the data in the column will be lost.
  - The primary key for the `DrawTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagId` on the `DrawTag` table. All the data in the column will be lost.
  - Added the required column `tagName` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagName` to the `DrawTag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "tagName" TEXT NOT NULL PRIMARY KEY
);
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new_DrawTag" (
    "drawId" INTEGER NOT NULL,
    "tagName" TEXT NOT NULL,

    PRIMARY KEY ("drawId", "tagName"),
    CONSTRAINT "DrawTag_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw" ("drawId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DrawTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag" ("tagName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DrawTag" ("drawId") SELECT "drawId" FROM "DrawTag";
DROP TABLE "DrawTag";
ALTER TABLE "new_DrawTag" RENAME TO "DrawTag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
