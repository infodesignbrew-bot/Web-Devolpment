import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  contact: text("contact").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions)
  .omit({
    id: true,
    createdAt: true,
  })

  .extend({
    name: z.string().nonempty("Name is required").min(3, "Enter at least 3 characters"),
    email: z.string().nonempty("Email is required").email("Enter a valid email address"),
    contact: z
      .string()
      .nonempty("Contact is required")
      .refine((val) => {
        const numberToParse = val.startsWith("+") ? val : `+${val}`;
        const phoneNumber = parsePhoneNumberFromString(numberToParse);
        return phoneNumber?.isValid() ?? false;
      }, "Enter a valid phone number"),
    message: z
      .string()
      .nonempty("Message is required")
      .refine((val) => val.trim().split(/\s+/).length >= 8, {
        message: "Message is too short",
      })
      .refine((val) => val.trim().split(/\s+/).length <= 200, {
        message: "Message is too long",
      }),
  });

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSchema>;
