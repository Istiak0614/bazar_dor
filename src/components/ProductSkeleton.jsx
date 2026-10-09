const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div
      className="product-grid"
      role="status"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div className="product-card" key={index}>
          <div className="flex items-center gap-3">
            <div className="skeleton h-11 w-11 rounded-xl" />

            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>

          <div className="skeleton mt-6 h-3 w-20" />
          <div className="skeleton mt-3 h-6 w-28" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;