import { 
  boolean,
  pgEnum,
  pgTable, 
  text,
  timestamp
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { createId as cuid } from "@paralleldrive/cuid2";

export const roles = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image: text("image"),
  role: roles("role").default("USER").notNull(),
  password: text("password").notNull(),
});

export const groups = pgTable("group", {
  id: text("id").primaryKey().$defaultFn(() => cuid()),
  name: text("name").notNull(),
  icon: text("icon"),
  year: text("year").notNull(),
  inTrash: boolean("inTrash").$default(() => false).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  createdBy: text("createdBy").notNull(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().$onUpdateFn(() => new Date().toISOString()),
  updatedBy: text("updatedBy").notNull(),
});

export const groupsInsertSchema = createInsertSchema(groups);

export const typesCompetency = pgEnum("typesCompetency", ["CC", "FC", "TC"]);

export const competencies = pgTable("competency", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  icon: text("icon"),
  definition: text("definition"),
  pl1: text("pl1"),
  pl2: text("pl2"),
  pl3: text("pl3"),
  pl4: text("pl4"),
  pl5: text("pl5"),
  type: typesCompetency("type").notNull(),
  inTrash: boolean("inTrash").$default(() => false).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  createdBy: text("createdBy").notNull(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().$onUpdateFn(() => new Date().toISOString()),
  updatedBy: text("updatedBy").notNull(),
});

export const compentenciesInsertSchema = createInsertSchema(competencies);