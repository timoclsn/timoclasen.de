import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { balconyControl } from "./schema";

const main = async () => {
  console.info("Seeding database...");

  const turso = createClient({
    url: "file:local.db",
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
