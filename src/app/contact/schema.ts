import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email."),
  business: z.string().trim().optional(),
  need: z.enum(["website", "quoting", "both"], {
    message: "Choose what you need.",
  }),
  message: z.string().trim().min(1, "Tell us what's going on."),
  // Honeypot — real visitors never fill this in.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
