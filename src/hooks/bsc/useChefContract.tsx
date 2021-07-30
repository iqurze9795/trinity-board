import { render } from "@testing-library/react"
import { ethers } from "ethers"
import { createContext, useContext, ReactNode, useEffect, useCallback } from "react"
import { useState } from "react"
interface IChefContract {
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
export const useChefContract = (props: IChefContract): IChefContractResponse => {
  useEffect(() => {
    console.log("props::", props)
  }, [props])
  return {} as IChefContractResponse
}