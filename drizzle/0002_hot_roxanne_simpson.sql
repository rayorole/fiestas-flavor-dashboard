ALTER TABLE `product` MODIFY COLUMN `id` varchar(255) NOT NULL DEFAULT '8319f6d9-996c-468c-b4f1-772b97165e45';--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `unique_slug` UNIQUE(`slug`);--> statement-breakpoint
ALTER TABLE `product` DROP INDEX `product_slug_unique`;