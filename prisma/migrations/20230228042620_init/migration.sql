-- CreateTable
CREATE TABLE "Tag" (
    "tagId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DrawTag" (
    "drawId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    PRIMARY KEY ("drawId", "tagId"),
    CONSTRAINT "DrawTag_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw" ("drawId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DrawTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("tagId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "drawId" INTEGER NOT NULL,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw" ("drawId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "bookmark" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "drawId" INTEGER NOT NULL,
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bookmark_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw" ("drawId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FollowUser" (
    "followerId" INTEGER NOT NULL,
    "followedUserId" INTEGER NOT NULL,

    PRIMARY KEY ("followerId", "followedUserId"),
    CONSTRAINT "FollowUser_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FollowUser_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chat" (
    "chatId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    CONSTRAINT "Chat_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Chat_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("chatId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
