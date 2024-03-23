import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { balconyControl } from "./schema";

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, LOCAL_DB } = process.env;
const localDb = LOCAL_DB === "true";

if (!localDb) {
  throw new Error(
    "🚨 Trying to seed remote database – comment out this check if you really want to do this!",
  );
}

const main = async () => {
  console.info("Seeding database...");

  const turso = createClient({
    url: localDb ? "file:local.db" : TURSO_DATABASE_URL,
    authToken: localDb ? undefined : TURSO_AUTH_TOKEN,
  });
  const db = drizzle(turso);

  await db.insert(balconyControl).values([
    {
      color: "red",
      count: 12,
    },
    {
      color: "green",
      count: 77,
    },
    {
      color: "blue",
      count: 34,
    },
  ]);

  console.info("Seeding complete.");
};

main();
