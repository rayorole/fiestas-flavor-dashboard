"use server";

import { db } from "@/database/conn";
import { products } from "@/database/schema";
import { Product } from "@/database/types";

export const publishProduct = async (product: Product) => {
    try {
        await db.insert(products).values(product);
        return {
            success: true,
            message: "Product published successfully.",
        };
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: "Failed to publish product.",
        };
    }
}