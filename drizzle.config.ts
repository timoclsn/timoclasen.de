import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

config({ path: ".env" });

export default defineConfig({
  dialect: "turso",
  dbCredentials: {
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
  schema: "./db/schema.ts",
});
