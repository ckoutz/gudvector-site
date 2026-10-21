import { TradePage } from "@/components/trade-page";
import { tradeMetadata, trades } from "@/lib/trades";

export const metadata = tradeMetadata(trades.handyman);

export default function HandymanPage() {
  return <TradePage trade={trades.handyman} />;
}
