import { TradePage } from "@/components/trade-page";
import { tradeMetadata, trades } from "@/lib/trades";

export const metadata = tradeMetadata(trades.plumbing);

export default function PlumbingPage() {
  return <TradePage trade={trades.plumbing} />;
}
