import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { bnNumber } from "@/lib/format";

const page = async () => {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <div className="wrap py-6 sm:py-8">
      <Hero />

      <section className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <span className="text-sm text-red-600" aria-hidden="true">
            ▲
          </span>
          আজ দাম বেড়েছে
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {risers.length === 0 && (
          <p className="panel p-5 text-sm text-gray-500">
            দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <span className="text-sm text-green-700" aria-hidden="true">
            ▼
          </span>
          আজ দাম কমেছে
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {fallers.length === 0 && (
          <p className="panel p-5 text-sm text-gray-500">
            দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      <section id="সব-পণ্য" className="mb-6 mt-8">
        <h2 className="text-lg font-bold">সব পণ্য</h2>

        <p className="mb-4 mt-1 text-xs text-[#6b756c]">
          মোট {bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="panel p-6 text-center text-sm text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
};

export default page;
