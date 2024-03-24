import "dotenv/config";
import type { Config } from "drizzle-kit";

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

export default {
  schema: "./db/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
} satisfies Config;
