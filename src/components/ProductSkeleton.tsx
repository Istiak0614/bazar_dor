const ProductSkeleton = () => {
  return (
    <div className="wrap py-8" role="status" aria-label="পণ্য লোড হচ্ছে">
      <div className="skeleton mb-8 h-44 w-full rounded-xl" />

      <div className="skeleton mb-5 h-7 w-48" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="panel p-4">
            <div className="flex items-center gap-3">
              <div className="skeleton h-11 w-11 rounded-full" />

              <div className="flex-1">
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton mt-2 h-3 w-1/2" />
              </div>
            </div>

            <div className="skeleton mt-5 h-3 w-20" />
            <div className="skeleton mt-2 h-6 w-28" />
          </div>
        ))}
      </div>

      <span className="sr-only">লোড হচ্ছে...</span>
    </div>
  );
};

export default ProductSkeleton;