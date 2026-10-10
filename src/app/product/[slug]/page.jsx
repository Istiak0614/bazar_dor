import { notFound } from "next/navigation";
import { getCatalog, getProduct } from "@/lib/catalog";
import { requireSession } from "@/lib/session";
import { money, unitLabel } from "@/lib/format";
import PriceBadge from "@/components/PriceBadge";

const page = async ({ params }) => {
  const { slug } = await params;

  const { products } = await getCatalog();

  const exists = products.some((product) => {
    return product.slug === slug;
  });

  if (!exists) {
    notFound();
  }

  await requireSession();

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const marketPrices = product.markets.map((market) => {
    return market.price;
  });

  let minPrice = product.minPrice;
  let maxPrice = product.maxPrice;
  let averagePrice = product.averagePrice;

  if (marketPrices.length) {
    minPrice = Math.min(...marketPrices);
    maxPrice = Math.max(...marketPrices);

    averagePrice =
      marketPrices.reduce((total, price) => {
        return total + price;
      }, 0) / marketPrices.length;
  }

  const showPrice = (value) => {
    if (value === null || value === undefined) {
      return "তথ্য পাওয়া যায়নি";
    }

    return money(value);
  };

  return (
    <div className="container-shell page-space">
      <section className="detail-summary panel">
        <div className="detail-title">
          <span className="detail-emoji" aria-hidden="true">
            {product.emoji}
          </span>

          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>

            <div className="detail-tags">
              <span className="badge badge-outline">
                {product.categoryName}
              </span>

              <span className="badge badge-outline">
                {unitLabel(product.unit)}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-current-price">
          <p>আজকের দাম</p>
          <strong>{money(product.price)}</strong>
          <PriceBadge change={product.change} />
        </div>
      </section>

      <section
        className="price-summary-grid"
        aria-label="দামের সারসংক্ষেপ"
      >
        <div className="panel summary-stat">
          <p>সর্বনিম্ন দাম</p>
          <strong className="text-green-700">
            {showPrice(minPrice)}
          </strong>
          <small>{unitLabel(product.unit)}</small>
        </div>

        <div className="panel summary-stat">
          <p>সর্বোচ্চ দাম</p>
          <strong className="text-red-600">
            {showPrice(maxPrice)}
          </strong>
          <small>{unitLabel(product.unit)}</small>
        </div>

        <div className="panel summary-stat">
          <p>গড় দাম</p>
          <strong>{showPrice(averagePrice)}</strong>
          <small>{unitLabel(product.unit)}</small>
        </div>
      </section>

      <section className="panel market-panel">
        <div className="section-heading">
          <h2>বাজারভিত্তিক আজকের দাম</h2>
          <p>বিভিন্ন বাজারের দাম তুলনা করুন</p>
        </div>

        {product.markets.length ? (
          <div className="table-scroll">
            <table className="table market-table">
              <thead>
                <tr>
                  <th>বাজারের নাম</th>
                  <th>এলাকা</th>
                  <th>আজকের দাম</th>
                  <th>পরিবর্তন</th>
                  <th>আপডেট</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr key={`${market.name}-${index}`}>
                    <td>{market.name}</td>
                    <td>{market.location}</td>
                    <td className="font-bold">
                      {money(market.price)}
                    </td>
                    <td>
                      <PriceBadge change={market.change} />
                    </td>
                    <td>{market.updatedAt || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-inline">
            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            API response-এর market fields যাচাই করুন।
          </p>
        )}
      </section>
    </div>
  );
};

export default page;