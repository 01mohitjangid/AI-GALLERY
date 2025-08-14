import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
    id: serial('id').primaryKey(),
    username: varchar('username').notNull(),
});

export const images = pgTable('images', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(), // Changed from text to integer to match people.id
    imgs: text('imgs').array().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const peopleImageRelation = relations(people, ({ many }) => ({
    images: many(images), // Changed from 'messages' to 'images'
}));

export const ImagePeopleRelation = relations(images, ({ one }) => ({
    user: one(people, {
        fields: [images.userId],
        references: [people.id]
    }),
}));

// Types
export type People = typeof people.$inferSelect;
export type Images = typeof images.$inferSelect;
