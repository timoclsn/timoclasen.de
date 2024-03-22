import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const balconyControl = sqliteTable("balcony_control", {
  color: text("color", { enum: ["red", "blue", "green"] }).primaryKey(),
  count: int("count").default(0).notNull(),
});
