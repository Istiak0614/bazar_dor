import Link from "next/link";
import { money, unitLabel } from "@/lib/format";
import PriceBadge from "@/components/PriceBadge";

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      className="product-card"
    >
      <div className="product-heading">
        <span className="product-emoji" aria-hidden="true">
          {product.emoji}
        </span>

        <div>
          <h3>{product.name}</h3>
          <p>{unitLabel(product.unit)}</p>
        </div>
      </div>

      <p className="price-label">আজকের দাম</p>

      <div className="product-price-row">
        <strong>{money(product.price)}</strong>
        <PriceBadge change={product.change} />
      </div>
    </Link>
  );
};

export default ProductCard;