import { Contract, ethers } from 'ethers'
import { bscTokens, BSC_VAULT_ABI } from '../chain-config/bsc'
import { getPrices } from "./price";

interface IBscChefContract {
  App: any,
  tokens: object,
  prices: object[],
  chef: Contract,
  chefAddress: string,
  chefAbi: object[],
  rewardTokenTicker: string,
  rewardTokenFunction: string,
  rewardsPerBlockFunction: any,
  rewardsPerWeekFixed: number,
  pendingRewardsFunction: string,
  deathPoolIndices: any
}

export const loadBscChefContract = async (props: IBscChefContract) => {
  const {
    App,
    tokens,
    prices,
    chef,
    chefAddress,
    chefAbi,
    rewardTokenTicker,
    rewardTokenFunction,
    rewardsPerBlockFunction,
    rewardsPerWeekFixed,
    pendingRewardsFunction,
    deathPoolIndices
  } = props
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();
  // let tokens: any = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3
  const poolInfos = await Promise.all([poolCount].map(async (x) =>
    await getBscPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
  console.log("pool infos::", poolInfos)
}

export const getBscPrices = async () => {
  const idPrices = await getPrices(bscTokens.map((x: any) => x.id));
  const prices: any = {}
  for (const bt of bscTokens) {
    if (idPrices[bt.id]) {
      prices[bt.contract] = idPrices[bt.id];
    }
  }
  return prices;
}

export const getBscToken = async (App: any, tokenAddress: string, stakingAddress: string) => {
  if (tokenAddress == "0x0000000000000000000000000000000000000000") {
    return getBep20(App, null, tokenAddress, "")
  }
  try {
    const VAULT = new ethers.Contract(tokenAddress, BSC_VAULT_ABI, App.provider);
    const _token = await VAULT.token();
    if (_token.toLowerCase() == "0x3b73c1b2ea59835cbfcadade5462b6ab630d9890") {
      throw "0x3b73c1b2ea59835cbfcadade5462b6ab630d9890 is self referential";
    }
    const vault = await getBscVault(App, VAULT, tokenAddress, stakingAddress) as any;
    window.localStorage.setItem(tokenAddress, "bscVault");
    return vault;
  }
  catch (err) {
    console.log("Get vault bsc error::", err)
  }
}


const getBep20 = async (App: any, token: any, address: string, stakingAddress: string) => {
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
  const decimals = await token.decimals()
  return {
    address,
    name: await token.name(),
    symbol: await token.symbol(),
    totalSupply: await token.totalSupply(),
    decimals: decimals,
    staked: await token.balanceOf(stakingAddress) / 10 ** decimals,
    unstaked: await token.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
    contract: token,
    tokens: [address]
  };
}

const getBscVault = async (App: any, vault: Contract, address: string, stakingAddress: string) => {
  const decimals = await vault.decimals();
  const token_ = await vault.token();
  const token = await getBscToken(App, token_, address);
  return {
    address,
    name: await vault.name(),
    symbol: await vault.symbol(),
    totalSupply: await vault.totalSupply(),
    decimals: decimals,
    staked: await vault.balanceOf(stakingAddress) / 10 ** decimals,
    unstaked: await vault.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
    token: token,
    balance: await vault.balance(),
    contract: vault,
    tokens: [address].concat(token.tokens),
  }
}

const getBscPoolInfo = async (App: any, chefContract: Contract, chefAddress: string, poolIndex: number, pendingRewardsFunction: string) => {
  const poolInfo = await chefContract.poolInfo(poolIndex);
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
  const poolToken = await getBscToken(App, poolInfo.lpToken ?? poolInfo.token, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
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
