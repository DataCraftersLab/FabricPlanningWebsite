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
    featuredImage: z.string().url().optional(),
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
    image: z.string().url().optional(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/courses" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lessons: z.number().optional(),
    duration: z.string(),          // e.g. "~3 hrs"
    level: z.string().default("All levels"),
    format: z.string().default("Online"),
    url: z.string().url(),
    featuredImage: z.string().url().optional(),
    thumbnailAspect: z.string().optional(),  // e.g. "16/9", "4/3", "1/1"
    available: z.boolean().default(true),
  }),
});

export const collections = { events, socialMedia, courses };
