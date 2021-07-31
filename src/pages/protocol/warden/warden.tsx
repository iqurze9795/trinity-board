import { useEffect } from "react";
import { useWallet } from "../../../hooks/useWallet";
import { Contract, ethers } from "ethers";
import { ABI, META } from './config'
import { useBscPrice } from "../../../hooks/bsc/useBscPrice";
import { chefContractHelper } from "../../../hooks/helper/bscContractHelper";
import { useState } from "react";

const calculateRewards = async (contract: ethers.Contract): Promise<number> => {
  const multiplier = await contract.BONUS_MULTIPLIER();
  return await contract.wardenPerBlock() / 1e18
    * 604800 / 3 * multiplier;
}

export const Warden = () => {
  const { web3Provider, walletProvider, address } = useWallet();
  const bscPrices = useBscPrice();

  useEffect(() => {
    (async () => {
      if (web3Provider && bscPrices) {
        const wadContract = new ethers.Contract(META.CHEF_ADDRESS, ABI, web3Provider);
        const rewardsPerWeek = await calculateRewards(wadContract)
        const r = chefContractHelper({
          address,
          walletProvider,
          prices: bscPrices,
          chefContract: wadContract,
          chefAddress: META.CHEF_ADDRESS,
          chefAbi: ABI,
          rewardTokenTicker: "WAD",
          rewardTokenFunction: "warden",
          rewardsPerBlockFunction: null,
          rewardsPerWeekFixed: rewardsPerWeek,
          pendingRewardsFunction: "pendingWarden",
          deathPoolIndices: [1]
        });
      }
    })()
  }, [bscPrices, web3Provider])

  return (
    <>
    </>
  );
}