import { bnPercent } from "@/lib/format";
import type { Product } from "@/lib/schemas";

type Props = {
  change: Product["change"];
};

const ChangeBadge = ({ change }: Props) => {
  let symbol = "—";
  let color = "bg-gray-100 text-gray-500";

  // Price going up is bad for buyers -> red. Going down -> green.
  if (change.dir === "up") {
    symbol = "▲";
    color = "bg-red-50 text-red-600";
  }

  if (change.dir === "down") {
    symbol = "▼";
    color = "bg-green-50 text-green-700";
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${color}`}
    >
      {symbol} {bnPercent(change.pct)}%
    </span>
  );
};

export default ChangeBadge;
