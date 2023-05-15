-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Draw" (
    "drawId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "draw" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "restrict18" BOOLEAN NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Draw_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Draw" ("creationDate", "description", "draw", "drawId", "isActive", "isPublic", "restrict18", "title", "userId") SELECT "creationDate", "description", "draw", "drawId", "isActive", "isPublic", "restrict18", "title", "userId" FROM "Draw";
DROP TABLE "Draw";
ALTER TABLE "new_Draw" RENAME TO "Draw";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
