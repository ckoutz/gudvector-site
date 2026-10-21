import { TradePage } from "@/components/trade-page";
import { tradeMetadata, trades } from "@/lib/trades";

export const metadata = tradeMetadata(trades.heatingAndCooling);

export default function HeatingAndCoolingPage() {
  return <TradePage trade={trades.heatingAndCooling} />;
}
