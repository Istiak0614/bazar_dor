import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { bnNumber, bnPercent, unitLabel } from "@/lib/format";

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

  const unit = unitLabel(product.unit);
  const shortUnit = unit.replace("প্রতি ", "");

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

  const diff = product.today - product.yesterday;

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  const changeSymbol =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <div className="wrap py-6">
      <nav
        aria-label="ব্রেডক্রাম্ব"
        className="flex flex-wrap items-center gap-2 text-xs text-[#6b756c]"
      >
        <Link href="/" className="hover:text-[#008d3f]">
          হোম
        </Link>
        <span aria-hidden="true">›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#008d3f]"
        >
          {product.categoryNameBn}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[#202a22]">{product.nameBn}</span>
      </nav>

      <section className="panel mt-4 flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#f0f4ee] text-3xl">
            {product.image}
          </span>

          <div>
            <h1 className="text-2xl font-bold text-[#202a22]">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-xs text-[#6b756c]">
              {unit} · {product.categoryNameBn}
            </p>

            <p className="mt-1 text-xs text-[#202a22]">
              {diff === 0 ? (
                "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <b>{diff > 0 ? "বেড়েছে" : "কমেছে"}</b> ·{" "}
                  {bnNumber(Math.abs(diff))} টাকা
                </>
              )}
            </p>
          </div>
        </div>

        <div className="min-w-28 rounded-lg bg-[#f0f5f1] px-5 py-3 text-center">
          <p className="text-[10px] text-[#6b756c]">আজকের দাম</p>
          <p className="text-3xl font-bold leading-tight text-[#202a22]">
            {bnNumber(product.today)}
          </p>
          <p className="text-[10px] text-[#6b756c]">টাকা / {shortUnit}</p>
          <p className={`mt-1 text-[11px] font-semibold ${changeColor}`}>
            {changeSymbol} {bnPercent(product.change.pct)}%
          </p>
        </div>
      </section>

      <section className="panel mt-4 p-5">
        <h2 className="mb-3 text-sm font-bold text-[#202a22]">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[#e0e8e1] p-4">
            <p className="text-[10px] text-[#6b756c]">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-xl font-bold text-green-700">
              {minimum === null ? "—" : bnNumber(minimum)}
              <span className="ml-1 text-xs font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-[10px] text-[#6b756c]">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="rounded-lg border border-[#e0e8e1] p-4">
            <p className="text-[10px] text-[#6b756c]">সর্বোচ্চ দাম</p>
            <p className="mt-1 text-xl font-bold text-red-600">
              {maximum === null ? "—" : bnNumber(maximum)}
              <span className="ml-1 text-xs font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-[10px] text-[#6b756c]">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="rounded-lg border border-[#e0e8e1] p-4">
            <p className="text-[10px] text-[#6b756c]">গড় দাম</p>
            <p className="mt-1 text-xl font-bold text-green-700">
              {average === null ? "—" : bnNumber(Math.round(average))}
              <span className="ml-1 text-xs font-normal">টাকা</span>
            </p>
            <p className="mt-1 text-[10px] text-[#6b756c]">
              {unit} এর হিসাব
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-6 text-sm font-bold text-[#202a22]">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto rounded-lg border border-[#e0e8e1]">
          <table className="w-full min-w-[650px] text-xs text-[#202a22]">
            <thead className="text-[#6b756c]">
              <tr className="border-b border-[#e0e8e1]">
                <th className="px-4 py-3 text-left font-normal">বাজার</th>
                <th className="px-4 py-3 text-left font-normal">বিভাগ</th>
                <th className="px-4 py-3 text-right font-normal">
                  সর্বনিম্ন
                </th>
                <th className="px-4 py-3 text-right font-normal">
                  সর্বোচ্চ
                </th>
                <th className="px-4 py-3 text-right font-normal">গড়</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market, index) => (
                <tr
                  key={`${market.market}-${index}`}
                  className="border-b border-[#e0e8e1] last:border-b-0 even:bg-[#f0f5f1]"
                >
                  <td className="px-4 py-3">{market.market}</td>
                  <td className="px-4 py-3">{market.division}</td>
                  <td className="px-4 py-3 text-right">
                    {bnNumber(market.min)} টাকা
                  </td>
                  <td className="px-4 py-3 text-right">
                    {bnNumber(market.max)} টাকা
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
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
