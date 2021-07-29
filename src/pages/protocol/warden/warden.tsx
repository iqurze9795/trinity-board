import { useWallet } from "../../../hooks/useWallet";
import { Contract, ethers } from "ethers";
import { ABI, META } from './config'
import { getBscPrices, loadBscChefContract } from "../../../helper/bscHelper";
import { useBscPrice } from "../../../hooks/bsc/useBscPrice";
import { useEffect } from "react";
import { useCallback } from "react";
const calculateRewards = async (contract: ethers.Contract): Promise<number> => {
  const multiplier = await contract.BONUS_MULTIPLIER();
  return await contract.wardenPerBlock() / 1e18
    * 604800 / 3 * multiplier;
}

export const Warden = () => {
  const { web3Provider, walletProvider } = useWallet();
  const bscPrices = useBscPrice();

  (async () => {
    if (web3Provider) {
      const wadContract = new ethers.Contract(META.CHEF_ADDRESS, ABI, web3Provider);
      const rewardsPerWeek = await calculateRewards(wadContract)
      const tokens = {};
      console.log("bscPrices", bscPrices)
      // const prices = await getBscPrices();


      // await loadBscChefContract(
      //   {
      //     App: walletProvider,
      //     tokens,
      //     prices,
      //     chef: WAD_CHEF,
      //     chefAddress: WAD_CHEF_ADDR,
      //     chefAbi: WAD_CHEF_ABI,
      //     rewardTokenTicker: rewardTokenTicker,
      //     rewardTokenFunction: "warden",
      //     rewardsPerBlockFunction: null,
      //     rewardsPerWeekFixed: rewardsPerWeek,
      //     pendingRewardsFunction: "pendingWarden",
      //     deathPoolIndices: [1]
      //   });
    }
  })()


  return (
    <>
    </>
  );
}