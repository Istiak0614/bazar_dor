import { bnPercent } from "@/lib/format";
import type { Product } from "@/lib/schemas";

type Props = {
  change: Product["change"];
};

const ChangeBadge = ({ change }: Props) => {
  let symbol = "—";
  let color = "bg-gray-100 text-gray-500";

  if (change.dir === "up") {
    symbol = "▲";
    color = "bg-green-50 text-green-700";
  }

  if (change.dir === "down") {
    symbol = "▼";
    color = "bg-red-50 text-red-600";
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded px-2 py-1 text-[10px] font-semibold ${color}`}
    >
      {symbol} {bnPercent(change.pct)}%
    </span>
  );
};

export default ChangeBadge;