import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../../db/schema";

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, NODE_ENV, LOCAL_DB } =
  process.env;
const localDb = LOCAL_DB === "true" && NODE_ENV === "development";

if (localDb) {
  console.info("🚀 Using local database");
} else {
  console.info("🚨 Using remote database");
}

const turso = createClient({
  url: localDb ? "file:local.db" : TURSO_DATABASE_URL,
  authToken: localDb ? undefined : TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
