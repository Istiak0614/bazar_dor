import Link from "next/link";
import type { Product } from "@/lib/schemas";
import { bnNumber, bnPercent, unitLabel } from "@/lib/format";

type Props = {
  products: Product[];
};

const Ticker = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <div className="border-b border-green-100 bg-white py-2 text-center text-xs text-gray-500">
        বাজারের দাম সাময়িকভাবে পাওয়া যাচ্ছে না।
      </div>
    );
  }

  const renderItems = (copy: number) => {
    return (
      <div
        className="bz-ticker-copy"
        aria-hidden={copy === 1 ? true : undefined}
      >
        {products.map((product) => (
          <Link
            key={`${copy}-${product.id}`}
            href={`/product/${product.slug}`}
            tabIndex={copy === 1 ? -1 : undefined}
            className="bz-ticker-item"
          >
            <span>
              {product.image} {product.nameBn}
            </span>

            <span>
              {bnNumber(product.today)} টাকা/{unitLabel(product.unit).replace(
                "প্রতি ",
                "",
              )}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "text-green-700"
                  : product.change.dir === "down"
                    ? "text-red-600"
                    : "text-gray-500"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {bnPercent(product.change.pct)}%
            </span>

            <span className="ml-3 text-gray-300">•</span>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div
      className="bz-ticker"
      aria-label="পণ্যের দামের খবর"
    >
      <div className="ticker-track">
        {renderItems(0)}
        {renderItems(1)}
      </div>
    </div>
  );
};

export default Ticker;