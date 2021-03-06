import { useEffect } from "react"
import { useState } from "react"
import { bscTokens } from '../chain-config/bsc'
import { get } from 'lodash'

export const usePrice = () => {
  const [prices, setPrices] = useState<any | null>(null)
  useEffect(() => {
    (async () => {
      const tokens = bscTokens.map((x: any) => x.id)
      const chunk: any = (arr: any, n: number) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : []
      const prices: any = {}
      for (const id_chunk of chunk(tokens, 10)) {
        let ids = id_chunk.join('%2C')
        try {
          const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd')
          const responseData: any = await response.json()
          for (const [key, v] of Object.entries(responseData)) {
            if (get(v, ["usd"])) prices[key] = v;
          }
        } catch (error) {
          console.log("fetch price error:", error)
        }
      }
      setPrices(prices)
    })()
  }, [])
  return prices
}