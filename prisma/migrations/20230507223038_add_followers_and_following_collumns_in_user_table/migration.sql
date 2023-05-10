-- AlterTable
ALTER TABLE `users` ADD COLUMN `followers_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `following_count` INTEGER NOT NULL DEFAULT 0;
