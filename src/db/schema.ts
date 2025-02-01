import { 
  pgEnum,
  pgTable, 
  text
} from "drizzle-orm/pg-core";

export const roles = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image: text("image"),
  role: roles("role").default("USER").notNull(),
  password: text("password").notNull(),
});