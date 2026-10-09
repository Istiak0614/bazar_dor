"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";

const CategoryProducts = ({ products }) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sort === "high") {
      result.sort((a, b) => {
        return b.price - a.price;
      });
    }

    return result;
  }, [products, sort]);

  return (
    <>
      <div className="sort-panel">
        <label htmlFor="product-sort">সাজান:</label>

        <select
          id="product-sort"
          className="select select-bordered"
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
          }}
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <ProductGrid products={sortedProducts} />
    </>
  );
};

export default CategoryProducts;