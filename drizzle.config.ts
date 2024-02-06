import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
    schema: "./database/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        uri: process.env.DATABASE_URL as string,
    },
    driver: "mysql2",
} satisfies Config;