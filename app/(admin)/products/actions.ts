import { db } from "@/database/conn";
import { products } from "@/database/schema";

export const getProducts = async () => {
    return await db.select().from(products);
}