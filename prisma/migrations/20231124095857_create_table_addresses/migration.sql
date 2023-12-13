-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `country` VARCHAR(100) NOT NULL,
    `postalCode` VARCHAR(10) NOT NULL,
    `contactId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
