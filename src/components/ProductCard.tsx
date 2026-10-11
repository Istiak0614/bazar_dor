import Link from "next/link";
import type { Product } from "@/lib/schemas";
import { bnNumber, unitLabel } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="panel block p-4 transition hover:border-green-300 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0f4ee] text-2xl">
          {product.image}
        </span>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{product.nameBn}</h3>
          <p className="mt-1 text-[11px] text-gray-500">
            {unitLabel(product.unit)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-gray-500">আজকের দাম</p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-lg font-bold">
          {bnNumber(product.today)}
          <span className="ml-1 text-xs font-normal">টাকা</span>
        </p>

        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
};

export default ProductCard;