import { useEffect, useState } from "react";
import { usePrice } from "../usePrice";
import { bscTokens } from '../../chain-config/bsc'

export const useBscPrice = () => {
  const prices = usePrice();
  const [bscPrices, setBscPrice] = useState<any | null>({})
  useEffect(() => {
    if (prices) {
      for (const bt of bscTokens) {
        if (prices[bt.id]) {
          bscPrices[bt.contract] = prices[bt.id];
        }
      }
      setBscPrice(bscPrices)
    }
  }, [prices])
  return bscPrices;
}