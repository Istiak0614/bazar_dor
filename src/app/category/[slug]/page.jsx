import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/catalog";
import { bnNumber } from "@/lib/format";
import CategoryProducts from "@/components/CategoryProducts";

const page = async ({ params }) => {
  const { slug } = await params;
  const { categories, products } = await getCatalog();

  const category = categories.find((item) => {
    return item.slug === slug;
  });

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((product) => {
    return product.categorySlug === category.slug;
  });

  if (!categoryProducts.length) {
    notFound();
  }

  return (
    <div className="container-shell page-space">
      <section className="category-heading panel">
        <span className="category-icon" aria-hidden="true">
          {category.icon}
        </span>

        <div>
          <h1>{category.name}</h1>
          <p>
            এই বিভাগের {bnNumber(categoryProducts.length)}টি
            পণ্যের আজকের বাজারদর
          </p>
        </div>
      </section>

      <CategoryProducts products={categoryProducts} />
    </div>
  );
};

export default page;