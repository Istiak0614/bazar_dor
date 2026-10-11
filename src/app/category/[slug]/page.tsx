import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import { getCategory } from "@/lib/categories";
import CategoryProducts from "@/components/CategoryProducts";

type Props = {
  params: Promise<{ slug: string }>;
};

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const allProducts = await getProducts();

  const products = allProducts.filter(
    (product) => product.category === category.slug,
  );

  return (
    <div className="wrap py-8">
      <h1 className="text-2xl font-bold">
        {category.icon} {category.nameBn}
      </h1>

      <p className="mb-6 mt-2 text-sm text-gray-500">
        এই বিভাগের পণ্যের আজকের বাজারদর।
      </p>

      <CategoryProducts products={products} />
    </div>
  );
};

export default page;