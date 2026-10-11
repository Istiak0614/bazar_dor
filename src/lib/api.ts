import "server-only";
import { cache } from "react";
import { productsSchema } from "@/lib/schemas";
import type { Product } from "@/lib/schemas";

const sources = [
  process.env.PRODUCT_API_URL ??
    "https://api.api-store.workers.dev/api/bazardor",
  process.env.PRODUCT_API_FALLBACK_URL ??
    "https://api.abcz.workers.dev/api/bazardor",
];

export const getProducts = cache(async (): Promise<Product[]> => {
  for (const source of sources) {
    try {
      const response = await fetch(
        `${source.replace(/\/$/, "")}/products`,
        {
          next: { revalidate: 60 },
          signal: AbortSignal.timeout(12000),
        },
      );

      if (!response.ok) {
        throw new Error(`Product API returned ${response.status}`);
      }

      const data: unknown = await response.json();

      return productsSchema.parse(data);
    } catch (error) {
      console.error("Product API request failed:", source, error);
    }
  }

  throw new Error("পণ্যের তথ্য লোড করা যাচ্ছে না। আবার চেষ্টা করুন।");
});

export const getProduct = async (
  slug: string,
): Promise<Product | undefined> => {
  const products = await getProducts();

  return products.find((product) => product.slug === slug);
};