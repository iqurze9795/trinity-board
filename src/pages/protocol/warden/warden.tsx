import { useEffect } from "react";
import { useWallet } from "../../../hooks/useWallet";
import { Contract, ethers } from "ethers";
import { ABI, META } from './config'
import { useBscPrice } from "../../../hooks/bsc/useBscPrice";
import { useChefContract } from "../../../hooks/bsc/useChefContract";
import { useState } from "react";

const calculateRewards = async (contract: ethers.Contract): Promise<number> => {
  const multiplier = await contract.BONUS_MULTIPLIER();
  return await contract.wardenPerBlock() / 1e18
    * 604800 / 3 * multiplier;
}

export const Warden = () => {
  const { web3Provider, walletProvider } = useWallet();
  const [wadContract, setSetContract] = useState<ethers.Contract | null>(null)
  const [rewardsPerWeekFixed, setRewardsPerWeekFixed] = useState<number | null>(null)
  const bscPrices = useBscPrice();
  const resp = useChefContract({
    walletProvider,
    prices: bscPrices,
    chef: wadContract,
    chefAddress: META.CHEF_ADDRESS,
    chefAbi: ABI,
    rewardTokenTicker: "WAD",
    rewardTokenFunction: "warden",
    rewardsPerBlockFunction: null,
    rewardsPerWeekFixed: rewardsPerWeekFixed,
    pendingRewardsFunction: "pendingWarden",
    deathPoolIndices: [1]
  });

  useEffect(() => {
    (async () => {
      if (web3Provider) {
        const wadContract = new ethers.Contract(META.CHEF_ADDRESS, ABI, web3Provider);
        const rewardsPerWeek = await calculateRewards(wadContract)
        setSetContract(wadContract)
        setRewardsPerWeekFixed(rewardsPerWeek)
      }
    })()
  }, [bscPrices, web3Provider])

  return (
    <>
    </>
  );
}