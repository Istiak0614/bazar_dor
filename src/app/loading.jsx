import ProductSkeleton from "@/components/ProductSkeleton";

const loading = () => {
  return (
    <div className="container-shell page-space">
      <div className="skeleton mb-8 h-28 w-full rounded-2xl" />
      <ProductSkeleton count={8} />
    </div>
  );
};

export default loading;