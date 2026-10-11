import { z } from "zod";
import { toNumber } from "@/lib/format";

const numeric = z.preprocess(toNumber, z.number().finite());

export const marketSchema = z.object({
  market: z.string(),
  division: z.string(),
  min: numeric,
  max: numeric,
});

export const productSchema = z.object({
  id: numeric,
  slug: z.string(),
  nameBn: z.string(),
  category: z.string(),
  categoryNameBn: z.string(),
  categoryIcon: z.string(),
  unit: z.string(),
  image: z.string(),
  today: numeric,
  yesterday: numeric,
  lastWeek: numeric,
  lastMonth: numeric,
  change: z.object({
    dir: z.enum(["up", "down", "flat"]),
    pct: numeric,
  }),
  markets: z.array(marketSchema),
});

export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
export type Market = z.infer<typeof marketSchema>;