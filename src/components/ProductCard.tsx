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
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f4ee] text-xl">
          {product.image}
        </span>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#202a22]">
            {product.nameBn}
          </h3>
          <p className="mt-0.5 text-[10px] text-[#6b756c]">
            {unitLabel(product.unit)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[#6b756c]">আজকের দাম</p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-lg font-bold text-[#202a22]">
          {bnNumber(product.today)}
          <span className="ml-1 text-xs font-normal">টাকা</span>
        </p>

        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
};

export default ProductCard;
