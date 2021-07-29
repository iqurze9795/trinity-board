import { useWallet } from "../../../hooks/useWallet";
import { ethers } from "ethers";
import WAD_CHEF_ABI from './abi.json'
import { getBscPrices, loadBscChefContract } from "../../../helper/bscHelper";
import { useCallback } from "react";

export const Warden = () => {
  const { web3Provider, walletProvider } = useWallet();

  useCallback(async () => {
    console.log("web3Provider", web3Provider)
    if (web3Provider) {
      const WAD_CHEF_ADDR = "0xde866dD77b6DF6772e320dC92BFF0eDDC626C674"
      const WAD_CHEF = new ethers.Contract(WAD_CHEF_ADDR, WAD_CHEF_ABI, web3Provider);
      const multiplier = await WAD_CHEF.BONUS_MULTIPLIER();
      const rewardsPerWeek = await WAD_CHEF.wardenPerBlock() / 1e18
        * 604800 / 3 * multiplier;
      const rewardTokenTicker = "WAD";
      const tokens = {};
      const prices = await getBscPrices();
      console.log(rewardsPerWeek)
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
  }, [])()

  return (
    <>
    </>
  );
}