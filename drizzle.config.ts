import "dotenv/config";
import type { Config } from "drizzle-kit";

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

export default {
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
  schema: "./db/schema.ts",
} satisfies Config;
