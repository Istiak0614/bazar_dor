"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/schemas";

type Props = {
  products: Product[];
};

type SortOrder = "default" | "asc" | "desc";

const CategoryProducts = ({ products }: Props) => {
  const [sort, setSort] = useState<SortOrder>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "asc") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sort === "desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <div className="panel py-16 text-center">
        <p className="text-5xl">🧺</p>
        <h2 className="mt-5 text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="mt-2 text-sm text-gray-500">
          এই বিভাগে এখন কোনো পণ্যের তথ্য নেই।
        </p>
        <Link href="/" className="btn btn-brand mt-5">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <label className="flex items-center gap-3 text-sm">
          <span>সাজান:</span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOrder)
            }
            className="select select-bordered w-56 bg-white"
            aria-label="দাম অনুযায়ী সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryProducts;