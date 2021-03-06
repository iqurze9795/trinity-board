import { ethers } from "ethers"
import { UNI_ABI, ERC20_ABI } from '../../chain-config/eth'
import { getPoolPrices, getParameterCaseInsensitive } from '../helper/priceHelper'
interface IChefContract {
  address: string | null,
  provider: any,
  prices: object[],
  chefContract: ethers.Contract | null,
  chefContractAddress: string,
  chefAbi: object[],
  rewardTokenTicker: string,
  rewardTokenFunction: string,
  rewardsPerBlockFunction: string | null,
  rewardsPerWeekFixed: number | null,
  pendingRewardsFunction: string,
  deathPoolIndices: number[]
}
interface IChefContractResponse {
  result: any[],
  status: string
}

async function getBep20(tokenContract: ethers.Contract, tokenAddress: string, chefContractAddress: string) {
  if (tokenAddress == "0x0000000000000000000000000000000000000000") {
    return {
      address: tokenAddress,
      name: "Binance",
      symbol: "BNB",
      totalSupply: 1e8,
      decimals: 18,
      staked: 0,
      unstaked: 0,
      contract: null,
      tokens: [tokenAddress]
    }
  }
  const decimals = await tokenContract.decimals()
  return {
    address: tokenAddress,
    name: await tokenContract.name(),
    symbol: await tokenContract.symbol(),
    totalSupply: await tokenContract.totalSupply(),
    decimals: decimals,
    staked: await tokenContract.balanceOf(chefContractAddress) / 10 ** decimals,
    unstaked: await tokenContract.balanceOf(tokenAddress) / 10 ** decimals,
    contract: tokenContract,
    tokens: [tokenAddress]
  };
}

export const getBscToken = async (address: string | null, provider: any, tokenAddress: string, chefContractAddress: string) => {
  const type = window.localStorage.getItem(tokenAddress);
  if (type) return getBscStoredToken(address, provider, tokenAddress, chefContractAddress, type);
  try {
    const pool = new ethers.Contract(tokenAddress, UNI_ABI, provider);
    const uniPool = await getBscUniPool(address, pool, tokenAddress, chefContractAddress);
    window.localStorage.setItem(tokenAddress, "uniswap");
    return uniPool;
  }
  catch (err) {
  }
  try {
    const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const erc20token = await getBep20(erc20, tokenAddress, chefContractAddress);
    window.localStorage.setItem(tokenAddress, "erc20");
    return erc20token;
  }
  catch (err) {
    console.log(`Couldn't match ${tokenAddress} to any known token type.`);
  }
}

export const getBscStoredToken = async (address: string | null, provider: any, tokenAddress: string, chefContractAddress: string, type: string) => {
  switch (type) {
    case "uniswap":
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, provider);
      return await getBscUniPool(address, pool, tokenAddress, chefContractAddress);
    case "erc20":
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      return await getBep20(erc20, tokenAddress, chefContractAddress);
  }
}

export const getBscUniPool = async (address: string | null, poolContract: ethers.Contract, lpTokenAddress: string, chefContractAddress: string) => {
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
    address: lpTokenAddress,
    token0,
    q0,
    token1,
    q1,
    totalSupply: await poolContract.totalSupply() / 10 ** decimals,
    chefContractAddress: chefContractAddress,
    staked: await poolContract.balanceOf(chefContractAddress) / 10 ** decimals,
    decimals: decimals,
    unstaked: await poolContract.balanceOf(address) / 10 ** decimals,
    contract: poolContract,
    tokens: [token0, token1],
    is1inch: false
  };
}

/**
 * Get bsc pool info function 
 * expect returing: array of pool info retriving by pool index.
 * @param address //User address
 * @param provider //Web3Provider Object
 * @param chefContract //ether.Contract obejct 
 * @param chefContractAddress //Masterchef address
 * @param poolIndex  //Index of pool
 * @param pendingRewardsFunction //Contract function which use to call pending rewards
 * @returns 
 */
export const getBscPoolInfo = async (address: string | null, provider: any, chefContract: ethers.Contract | null, chefContractAddress: string, poolIndex: number, pendingRewardsFunction: string) => {
  const poolInfo = await chefContract?.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
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
  const poolToken = await getBscToken(address, provider, poolInfo.lpToken ?? poolInfo.token, chefContractAddress);
  const userInfo = await chefContract?.userInfo(poolIndex, address);
  const pendingRewardTokens = await chefContract?.callStatic[pendingRewardsFunction](poolIndex, address);
  const staked = userInfo.amount / 10 ** poolToken?.decimals;
  return {
    address: poolInfo.lpToken ?? poolInfo.token, //shot operator mean if lp token is null, will return token instead
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens / 1e18,
    depositFee: (poolInfo.depositFeeBP ?? 0) / 100,
    withdrawFee: (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}

export const chefContractHelper = async (props: IChefContract): Promise<IChefContractResponse> => {
  const {
    provider,
    address,
    prices,
    chefContract,
    chefContractAddress,
    rewardTokenFunction,
    rewardsPerWeekFixed,
    rewardsPerBlockFunction,
    pendingRewardsFunction,
    deathPoolIndices
  } = props
  if (provider) {
    const poolCount = parseInt(await chefContract?.poolLength(), 10);
    const totalAllocPoints = await chefContract?.totalAllocPoint();
    const rewardTokenAddress = await chefContract?.callStatic[rewardTokenFunction]();
    const rewardToken = await getBscToken(address, provider, rewardTokenAddress, chefContractAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract?.callStatic[rewardsPerBlockFunction ?? ""]()
      / 10 ** rewardToken?.decimals * 604800 / 3
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    let poolInfos = await Promise.all([...new Array(poolCount)].map(async (x, index) => {
      return await getBscPoolInfo(
        address,
        provider,
        chefContract,
        chefContractAddress,
        index,
        pendingRewardsFunction
      )
    })).then(resp => {
      return resp.map(item => {
        const poolRewardsPerWeek = item.allocPoints / totalAllocPoints * rewardsPerWeek;
        const userStaked = item.userLPStaked ?? item.userStaked;
        return {
          ...item,
          poolRewardsPerWeek,
          userStaked
        }
      })
    })
    const tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken?.tokens) as never)
    let tokens = {} as any
    await Promise.all(tokenAddresses.map(async (tokenAddres) => {
      const resp = await getBscToken(address, provider, tokenAddres, chefContractAddress)
      tokens[tokenAddres] = resp
    }));
    if (deathPoolIndices) {   //load prices for the deathpool assets [single asset staking pool]
      deathPoolIndices.map(i => poolInfos[i])
        .map(poolInfo =>
          poolInfo.poolToken ?
            getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined
        );
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
    poolInfos = poolInfos.map((item, index) => {
      return { ...item, poolPrice: poolPrices[index], rewardPrice }
    })
    return {
      result: poolInfos,
      status: "completed"
    } as IChefContractResponse
  }

  return {
    status: "No provider found."
  } as IChefContractResponse
}