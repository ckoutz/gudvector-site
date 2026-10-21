import { TradePage } from "@/components/trade-page";
import { tradeMetadata, trades } from "@/lib/trades";

export const metadata = tradeMetadata(trades.houseCleaning);

export default function HouseCleaningPage() {
  return <TradePage trade={trades.houseCleaning} />;
}
