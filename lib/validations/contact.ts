import { z } from "zod";

export const contactNeedValues = ["website", "systems", "both"] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tell us your name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "We need an email so we can reply.")
    .email("That email does not look right.")
    .max(200, "Email is too long."),
  need: z.enum(contactNeedValues, {
    error: "Say whether you need a website, systems, or both.",
  }),
  message: z
    .string()
    .trim()
    .min(1, "Tell us what you need.")
    .max(5000, "Message is too long."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const needLabels: Record<(typeof contactNeedValues)[number], string> = {
  website: "Website",
  systems: "Systems",
  both: "Both",
};
