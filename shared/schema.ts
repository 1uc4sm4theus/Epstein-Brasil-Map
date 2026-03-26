import { pgTable, text, serial, integer, boolean, jsonb, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Locations (Cities)
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'Capital', 'Pequena', etc.
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  description: text("description").notNull(),
  yearRange: text("year_range"),
  imageUrl: text("image_url"),
});

// Categories/Tags (Recruitment, Financial, etc.)
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(), // Emoji or icon name
  slug: text("slug").notNull().unique(),
});

// Join table for Locations <-> Categories
export const locationCategories = pgTable("location_categories", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull().references(() => locations.id),
  categoryId: integer("category_id").notNull().references(() => categories.id),
});

// Timeline Events / Investigations
export const timelineEvents = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  locationId: integer("location_id").references(() => locations.id),
  type: text("type").default("event"), // 'event' or 'lead'
  externalLink: text("external_link"),
  shortId: text("short_id"), // For anonymous leads like BR-EP-47K9X2
});

// Sources/Links for verification
export const sources = pgTable("sources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  locationId: integer("location_id").notNull().references(() => locations.id),
});

// Insert Schemas
export const insertLocationSchema = createInsertSchema(locations);
export const insertCategorySchema = createInsertSchema(categories);
export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({ id: true });
export const insertSourceSchema = createInsertSchema(sources);

// Types
export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Category = typeof categories.$inferSelect;
export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type Source = typeof sources.$inferSelect;

// Composite type for API response
export type LocationWithDetails = Location & {
  categories: Category[];
  sources: Source[];
};
