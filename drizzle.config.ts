import "dotenv/config";
import type { Config } from "drizzle-kit";

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, LOCAL_DB } = process.env;
const localDb = LOCAL_DB === "true";

if (localDb) {
  console.info("🚀 Using local database");
} else {
  console.info("🚨 Using remote database");
}

export default {
  schema: "./db/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: localDb ? "file:local.db" : TURSO_DATABASE_URL,
    authToken: localDb ? undefined : TURSO_AUTH_TOKEN,
  },
} satisfies Config;
