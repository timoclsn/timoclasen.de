import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const balconyControl = sqliteTable("balcony_control", {
  color: text("color", {
    mode: "text",
    length: 256,
    enum: ["red", "blue", "green"],
  }).primaryKey(),
  count: int("count", {
    mode: "number",
  })
    .default(0)
    .notNull(),
});
