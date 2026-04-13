import { defineConfig } from "tinacms";

// Resolve at build time so deploy previews / develop / main all index correctly.
// Netlify exposes the current branch as HEAD or BRANCH; fall back to main.
const branch = process.env.HEAD || process.env.BRANCH || "main";

const authorFields = [
  { type: "string" as const, name: "name", label: "Name", required: true },
  {
    type: "string" as const,
    name: "bio",
    label: "Bio",
    ui: { component: "textarea" as const },
  },
  {
    type: "string" as const,
    name: "avatarUrl",
    label: "Avatar URL",
    description:
      "Full URL on https://media.fabricplanning.io. Do NOT commit images to the repo.",
  },
  { type: "string" as const, name: "linkedinUrl", label: "LinkedIn URL" },
];

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "faq",
        label: "FAQ",
        path: "content/faq",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Question",
            isTitle: true,
            required: true,
          },
          { type: "number", name: "order", label: "Order" },
          {
            type: "datetime",
            name: "lastReviewed",
            label: "Last Reviewed",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Answer",
            isBody: true,
          },
        ],
      },

      {
        name: "events",
        label: "Events",
        path: "content/events",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "time", label: "Time" },
          { type: "string", name: "location", label: "Location" },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: ["virtual", "in-person", "webinar"],
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "registrationUrl",
            label: "Registration URL",
          },
          {
            type: "string",
            name: "featuredImage",
            label: "Featured Image URL",
            description:
              "Full URL on https://media.fabricplanning.io. Do NOT commit images to the repo.",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Extended Description",
            isBody: true,
          },
        ],
      },

      {
        name: "blog",
        label: "Blog",
        path: "content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          { type: "datetime", name: "date", label: "Date" },
          {
            type: "object",
            name: "author",
            label: "Author",
            fields: authorFields,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "featuredImage",
            label: "Featured Image URL",
            description:
              "Full URL on https://media.fabricplanning.io. Do NOT commit images to the repo.",
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["draft", "review", "published"],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      {
        name: "socialMedia",
        label: "Social Media",
        path: "content/social-media",
        format: "md",
        fields: [
          {
            type: "string",
            name: "author",
            label: "Author",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "platform",
            label: "Platform",
            options: ["linkedin", "reddit", "twitter"],
          },
          { type: "string", name: "url", label: "URL" },
          { type: "datetime", name: "date", label: "Date" },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" },
          },
          { type: "number", name: "likes", label: "Likes" },
          { type: "number", name: "comments", label: "Comments" },
          {
            type: "string",
            name: "image",
            label: "Image URL",
            description:
              "Full URL on https://media.fabricplanning.io. Do NOT commit images to the repo.",
          },
        ],
      },

      {
        name: "knowledgeBase",
        label: "Knowledge Base",
        path: "content/knowledge-base",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "category", label: "Category" },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "datetime",
            name: "lastReviewed",
            label: "Last Reviewed",
          },
          {
            type: "object",
            name: "author",
            label: "Author",
            fields: authorFields,
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["draft", "review", "published"],
          },
          { type: "number", name: "order", label: "Order" },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
