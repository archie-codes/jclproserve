import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // e.g., "Full-Time", "Contractual"
  salary: varchar("salary", { length: 255 }),
  description: text("description").notNull(),

  // PostgreSQL Arrays for your bullet points
  responsibilities: text("responsibilities").array().notNull(),
  qualifications: text("qualifications").array().notNull(),
  experience: text("experience").array(),
  skills: text("skills").array(), // Note: Changed to lowercase 'skills' for consistency

  urgent: boolean("urgent").default(false),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
