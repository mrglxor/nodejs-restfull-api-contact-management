-- CreateTable
CREATE TABLE `contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
