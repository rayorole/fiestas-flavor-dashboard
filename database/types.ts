import { InferSelectModel } from "drizzle-orm";
import { products } from "./schema";

export type Product = InferSelectModel<typeof products>;