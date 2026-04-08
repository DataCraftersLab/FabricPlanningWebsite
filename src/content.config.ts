import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string(),
    location: z.string().optional(),
    type: z.enum(["virtual", "in-person", "webinar"]),
    description: z.string(),
    registrationUrl: z.string().optional(),
    isPast: z.boolean().default(false),
  }),
});

const socialMedia = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/social-media" }),
  schema: z.object({
    author: z.string(),
    platform: z.enum(["linkedin", "reddit", "twitter"]),
    url: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    likes: z.number().default(0),
    comments: z.number().default(0),
  }),
});

export const collections = { events, socialMedia };
