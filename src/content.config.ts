import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const celebrationSchema = z.object({
  title: z.string().min(1),
  eventType: z.string().min(1),
  location: z.string().optional(),
  venue: z.string().optional(),
  date: z.coerce.date().optional(),
  summary: z.string().min(1),
  clientGoal: z.string().optional(),
  planningScope: z.array(z.string()).default([]),
  designDirection: z.string().optional(),
  vendorCoordination: z.string().optional(),
  logisticalChallenge: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  featuredImage: z.string().optional(),
  gallery: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
      }),
    )
    .default([]),
  vendorCredits: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
});

const journalSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  searchIntent: z.string().min(1),
  audienceQuestion: z.string().min(1),
  ownerContributionNeeded: z.array(z.string()).min(1),
  proposedOutline: z.array(z.string()).min(2),
  internalLinks: z.array(z.string()).default([]),
  assetsNeeded: z.array(z.string()).default([]),
  factsToVerify: z.array(z.string()).default([]),
  conversionCta: z.string().min(1),
  author: z.string().optional(),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  draft: z.boolean().default(true),
});

export const collections = {
  celebrations: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/celebrations' }),
    schema: celebrationSchema,
  }),
  journal: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/journal' }),
    schema: journalSchema,
  }),
};
