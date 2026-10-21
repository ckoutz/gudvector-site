import { TradePage } from "@/components/trade-page";
import { tradeMetadata, trades } from "@/lib/trades";

export const metadata = tradeMetadata(trades.hvac);

export default function HvacPage() {
  return <TradePage trade={trades.hvac} />;
}
