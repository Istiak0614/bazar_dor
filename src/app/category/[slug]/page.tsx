import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import { getCategory } from "@/lib/categories";
import { bnNumber } from "@/lib/format";
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
      <section className="panel flex items-center gap-4 p-5">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0f4ee] text-3xl"
          aria-hidden="true"
        >
          {category.icon}
        </span>

        <div>
          <h1 className="text-2xl font-bold text-[#202a22]">
            {category.nameBn}
          </h1>

          <p className="mt-1 text-xs text-[#6b756c]">
            {bnNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      <CategoryProducts products={products} />
    </div>
  );
};

export default page;
