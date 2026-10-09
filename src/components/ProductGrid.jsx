import ProductCard from "@/components/ProductCard";

const ProductGrid = ({ products, compact = false }) => {
  if (!products.length) {
    return (
      <div className="empty-inline">
        এই তালিকায় বর্তমানে কোনো পণ্য নেই।
      </div>
    );
  }

  return (
    <div
      className={`product-grid ${
        compact ? "product-grid-compact" : ""
      }`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;