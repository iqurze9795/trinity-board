import { get } from "lodash"
import { ethers } from "ethers"
export const getParameterCaseInsensitive = (object: Object, key: string) => {
  const findKey = Object.keys(object).find(k => k.toLowerCase() === key.toLowerCase()) || ""
  return get(object, [`${findKey}`]);
}

export const getErc20Prices = (prices: any[], pool: ethers.Contract, chain = "eth") => {
  const price = getParameterCaseInsensitive(prices, pool.address)?.usd;
  const tvl = pool.totalSupply * price / 10 ** pool.decimals;
  const stakedTvl = pool.staked * price;
  let poolUrl;
  switch (chain) {
    case "eth":
      poolUrl = `https://etherscan.io/token/${pool.address}`;
      break;
    case "bsc":
      poolUrl = `https://bscscan.com/token/${pool.address}`;
      break;
    case "matic":
      poolUrl = `https://explorer-mainnet.maticvigil.com/address/${pool.address}`;
      break;
    case "kcc":
      poolUrl = `https://explorer.kcc.io/en/address/${pool.address}`;
      break;
  }
  return {
    tvl: tvl,
    stakedTvl: stakedTvl,
    price: price,
    stakeTokenTicker: pool.symbol,
  }
}

export const getUniPrices = (tokens: string[], prices: any, pool: any, chain = "eth") => {
  const t0 = getParameterCaseInsensitive(tokens, pool.token0);
  let p0 = getParameterCaseInsensitive(prices, pool.token0)?.usd;
  const t1 = getParameterCaseInsensitive(tokens, pool.token1);
  let p1 = getParameterCaseInsensitive(prices, pool.token1)?.usd;
  if (p0 == null && p1 == null) {
    console.log(`Missing prices for tokens ${pool.token0} and ${pool.token1}.`);
    return undefined;
  }
  if (t0?.decimals == null) {
    console.log(`Missing information for token ${pool.token0}.`);
    return undefined;
  }
  if (t1?.decimals == null) {
    console.log(`Missing information for token ${pool.token1}.`);
    return undefined;
  }
  const q0 = pool.q0 / 10 ** t0.decimals;
  const q1 = pool.q1 / 10 ** t1.decimals;
  if (p0 == null) {
    p0 = q1 * p1 / q0;
    prices[pool.token0] = { usd: p0 };
  }
  if (p1 == null) {
    p1 = q0 * p0 / q1;
    prices[pool.token1] = { usd: p1 };
  }
  const tvl = q0 * p0 + q1 * p1;
  const price = tvl / pool.totalSupply;
  prices[pool.address] = { usd: price };
  const stakedTvl = pool.staked * price;
  return {
    t0: t0,
    p0: p0,
    q0: q0,
    t1: t1,
    p1: p1,
    q1: q1,
    price: price,
    tvl: tvl,
    stakedTvl: stakedTvl,
  }
}

export const getPoolPrices = (tokens: string[], prices: any[], pool: any, chain: string = "eth") => {
  if (pool.token0 != null) {
    return getUniPrices(tokens, prices, pool);
  }
  return getErc20Prices(prices, pool, chain);
}