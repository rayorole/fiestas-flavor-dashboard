CREATE TABLE `product` (
	`id` varchar(255) NOT NULL DEFAULT '57882349-dab7-45c7-aeb2-5ffdcab4ff85',
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`currency` varchar(5) NOT NULL,
	`description` varchar(255),
	`images` json,
	`customFields` json,
	`stock` int NOT NULL,
	`createdAt` timestamp(3) DEFAULT (now()),
	`updatedAt` timestamp(3) DEFAULT (now()),
	CONSTRAINT `product_id` PRIMARY KEY(`id`),
	CONSTRAINT `product_slug_unique` UNIQUE(`slug`)
);
