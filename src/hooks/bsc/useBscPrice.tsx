import { useEffect, useState } from "react";
import { usePrice } from "../usePrice";
import { bscTokens } from '../../chain-config/bsc'

export const useBscPrice = () => {
  const prices = usePrice();
  const [bscPrices, setBscPrice] = useState<any | null>(null)
  useEffect(() => {
    if (prices) {
      let _prices: any = {}
      for (const bt of bscTokens) {
        if (prices[bt.id]) {
          _prices[bt.contract] = prices[bt.id];
        }
      }
      setBscPrice(_prices)
    }
  }, [prices])
  return bscPrices;
}