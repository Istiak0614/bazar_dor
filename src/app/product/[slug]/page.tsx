import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { bnNumber, unitLabel } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

type Props = {
  params: Promise<{ slug: string }>;
};

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  await requireSession();

  const markets = [...product.markets].sort(
    (a, b) => (a.min + a.max) / 2 - (b.min + b.max) / 2,
  );

  const minimum =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : null;

  const maximum =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : null;

  const average =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : null;

  return (
    <div className="wrap py-8">
      <Link
        href={`/category/${product.category}`}
        className="text-sm text-brand hover:underline"
      >
        ← {product.categoryNameBn} বিভাগে ফিরে যান
      </Link>

      <section className="panel mt-5 flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-50 text-4xl">
            {product.image}
          </span>

          <div>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>

            <p className="mt-2 text-sm text-gray-500">
              বাংলাদেশের বিভিন্ন বাজারের সম্ভাব্য দাম।
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                href={`/category/${product.category}`}
                className="badge border-green-100 bg-green-50 text-green-700"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>

              <span className="text-xs text-gray-500">
                {unitLabel(product.unit)}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-green-100 bg-white p-4 sm:text-right">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="my-2 text-2xl font-bold">
            {bnNumber(product.today)} টাকা
          </p>
          <ChangeBadge change={product.change} />
        </div>
      </section>

      <section className="mt-7">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="panel p-5">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              {minimum === null ? "—" : `${bnNumber(minimum)} টাকা`}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              তালিকাভুক্ত বাজারের মধ্যে
            </p>
          </div>

          <div className="panel p-5">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {maximum === null ? "—" : `${bnNumber(maximum)} টাকা`}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              তালিকাভুক্ত বাজারের মধ্যে
            </p>
          </div>

          <div className="panel p-5">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              {average === null ? "—" : `${bnNumber(average)} টাকা`}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              বাজারগুলোর মধ্যমূল্যের গড়
            </p>
          </div>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="mb-4 text-lg font-bold">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="panel overflow-x-auto">
          <table className="table min-w-[650px] text-sm">
            <thead className="bg-green-50 text-gray-600">
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বোচ্চ</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market, index) => (
                <tr
                  key={`${market.market}-${index}`}
                  className="even:bg-[#f0f5f1]"
                >
                  <td>{market.market}</td>
                  <td>{market.division}</td>
                  <td className="text-right">
                    {bnNumber(market.min)} টাকা
                  </td>
                  <td className="text-right">
                    {bnNumber(market.max)} টাকা
                  </td>
                  <td className="text-right">
                    {bnNumber((market.min + market.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {markets.length === 0 && (
            <p className="p-6 text-center text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default page;