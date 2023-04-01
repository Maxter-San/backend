/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookmark` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `bookmarkId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Premium" (
    "premiumId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationDate" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Premium_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "coverPhoto" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "description" TEXT,
    "paypalLink" TEXT,
    "twitterLink" TEXT,
    "facebookLink" TEXT,
    "isPremium" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("birthDate", "coverPhoto", "creationDate", "description", "email", "facebookLink", "gender", "isActive", "name", "password", "paypalLink", "profilePhoto", "twitterLink", "userId", "userName") SELECT "birthDate", "coverPhoto", "creationDate", "description", "email", "facebookLink", "gender", "isActive", "name", "password", "paypalLink", "profilePhoto", "twitterLink", "userId", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Bookmark" (
    "bookmarkId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "drawId" INTEGER NOT NULL,
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bookmark_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw" ("drawId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bookmark" ("creationDate", "drawId", "userId") SELECT "creationDate", "drawId", "userId" FROM "Bookmark";
DROP TABLE "Bookmark";
ALTER TABLE "new_Bookmark" RENAME TO "Bookmark";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
