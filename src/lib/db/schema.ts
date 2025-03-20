import { relations } from 'drizzle-orm';
import {integer, pgEnum, pgTable,serial,text, timestamp, varchar} from 'drizzle-orm/pg-core'

// schema
export const people = pgTable('people',{
    id:serial('id').primaryKey(),
    username:varchar('username').notNull(),
})
export const images = pgTable('images',{
    id:serial('id').primaryKey(),
    userId:text('user_id').notNull(),
    imgs:text('imgs').array().notNull(),
    createdAt:timestamp('created_at').notNull().defaultNow(),
})


export const peopleImageRelation = relations(people, ({ many }) => ({
	messages: many(images),
}));

export const ImagePeopleRelation = relations(images, ({ one }) => ({
    user: one(people,{
        fields:[images.userId],
        references:[people.id]
    }),
}));
// types
export type People = typeof people.$inferSelect
export type Images = typeof images.$inferSelect
