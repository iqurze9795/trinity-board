import { render } from "@testing-library/react"
import { ethers } from "ethers"
import { UNI_ABI, ERC20_ABI } from '../../../chain-config/eth'
interface IChefContract {
  address: string | null,
  walletProvider: any,
  prices: object[],
  chef: ethers.Contract | null,
  chefAddress: string,
  chefAbi: object[],
  rewardTokenTicker: string,
  rewardTokenFunction: string,
  rewardsPerBlockFunction: string | null,
  rewardsPerWeekFixed: number | null,
  pendingRewardsFunction: string,
  deathPoolIndices: number[]
}
interface IChefContractResponse {
  totalUserStaked: string,
  totalStaked: string,
  averageApr: string
}

async function getBep20(tokenContract: ethers.Contract, address: string, stakingAddress: string) {
  if (address == "0x0000000000000000000000000000000000000000") {
    return {
      address,
      name: "Binance",
      symbol: "BNB",
      totalSupply: 1e8,
      decimals: 18,
      staked: 0,
      unstaked: 0,
      contract: null,
      tokens: [address]
    }
  }
  const decimals = await tokenContract.decimals()
  return {
    address,
    name: await tokenContract.name(),
    symbol: await tokenContract.symbol(),
    totalSupply: await tokenContract.totalSupply(),
    decimals: decimals,
    staked: await tokenContract.balanceOf(stakingAddress) / 10 ** decimals,
    unstaked: await tokenContract.balanceOf(address) / 10 ** decimals,
    contract: tokenContract,
    tokens: [address]
  };
}

export const getBscToken = (address: string | null, provider: any, tokenAddress: string, stakingAddress: string) => {
  const type = window.localStorage.getItem(tokenAddress);
  if (type) return getBscStoredToken(address, provider, tokenAddress, stakingAddress, type);
}

export const getBscStoredToken = async (address: string | null, provider: any, tokenAddress: string, stakingAddress: string, type: string) => {
  switch (type) {
    case "uniswap":
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, provider);
      return await getBscUniPool(address, pool, tokenAddress, stakingAddress);
    case "erc20":
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      return await getBep20(erc20, tokenAddress, stakingAddress);
  }
}

export const getBscUniPool = async (address: string | null, poolContract: ethers.Contract, poolAddress: string, stakingAddress: string) => {
  let q0, q1;
  const reserves = await poolContract.getReserves();
  q0 = reserves._reserve0;
  q1 = reserves._reserve1;
  const decimals = await poolContract.decimals();
  const token0 = await poolContract.token0();
  const token1 = await poolContract.token1();
  return {
    symbol: await poolContract.symbol(),
    name: await poolContract.name(),
    address: poolAddress,
    token0,
    q0,
    token1,
    q1,
    totalSupply: await poolContract.totalSupply() / 10 ** decimals,
    stakingAddress: stakingAddress,
    staked: await poolContract.balanceOf(stakingAddress) / 10 ** decimals,
    decimals: decimals,
    unstaked: await poolContract.balanceOf(address) / 10 ** decimals,
    contract: poolContract,
    tokens: [token0, token1],
    is1inch: false
  };
}

export const getBscPoolInfo = async (address: string | null, provider: any, chefContract: ethers.Contract | null, chefAddress: string, poolIndex: number, pendingRewardsFunction: string) => {
  const poolInfo = await chefContract?.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0 || poolIndex == 105) {
    return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked: 0,
      pendingRewardTokens: 0,
      stakedToken: null,
      userLPStaked: 0,
      lastRewardBlock: poolInfo.lastRewardBlock
    };
  }
  const poolToken = await getBscToken(address, provider, poolInfo.lpToken ?? poolInfo.token, chefAddress);
  const userInfo = await chefContract?.userInfo(poolIndex, address);
  const pendingRewardTokens = await chefContract?.callStatic[pendingRewardsFunction](poolIndex, address);
  const staked = userInfo.amount / 10 ** poolToken?.decimals;
  return {
    address: poolInfo.lpToken ?? poolInfo.token,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens / 10 ** 18,
    depositFee: (poolInfo.depositFeeBP ?? 0) / 100,
    withdrawFee: (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}

export const chefContractHelper = async (props: IChefContract): Promise<IChefContractResponse> => {
  const { walletProvider, address, chef, chefAddress, pendingRewardsFunction } = props
  if (walletProvider) {
    const provider = new ethers.providers.Web3Provider(walletProvider)
    const poolCount = parseInt(await chef?.poolLength(), 10);
    const poolInfos = await Promise.all([...new Array(poolCount)].map(async (x, index) => {
      return await getBscPoolInfo(address, provider, chef, chefAddress, index, pendingRewardsFunction)
    }))
    console.log(poolInfos)
  }

  return {} as IChefContractResponse
}