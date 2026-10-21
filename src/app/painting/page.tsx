import { TradePage } from "@/components/trade-page";
import { tradeMetadata, trades } from "@/lib/trades";

export const metadata = tradeMetadata(trades.painting);

export default function PaintingPage() {
  return <TradePage trade={trades.painting} />;
}
