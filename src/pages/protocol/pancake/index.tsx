import { useEffect } from "react";
import { useWallet } from "../../../hooks/useWallet";
import { ethers } from "ethers";
import { ABI, META } from './config'
import { useBscPrice } from "../../../hooks/bsc/useBscPrice";
import { chefContractHelper } from "../../../hooks/helper/bscContractHelper";
import { useState } from "react";
import { get } from "lodash";
import { Card, Row, Col, Spinner, Form } from "react-bootstrap";

//component
import LPCard from "../../../components/display/cards/LPCard";

const calculateRewards = async (contract: ethers.Contract): Promise<number> => {
  return await contract.cakePerBlock() / 1e18
    * 604800 / 3;
}

export const Cake = () => {
  const { web3Provider, address } = useWallet();
  const [pool, setPool] = useState<Array<object>>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const bscPrices = useBscPrice();

  useEffect(() => {
    (async () => {
      setLoading(true)
      if (web3Provider && bscPrices) {
        const pancakeContract = new ethers.Contract(META.CHEF_ADDRESS, ABI, web3Provider);
        const rewardsPerWeek = await calculateRewards(pancakeContract)
        setLoading(true)
        const response = await chefContractHelper({
          address,
          provider: web3Provider,
          prices: bscPrices,
          chefContract: pancakeContract,
          chefAddress: META.CHEF_ADDRESS,
          chefAbi: ABI,
          rewardTokenTicker: "CAKE",
          rewardTokenFunction: "cake",
          rewardsPerBlockFunction: null,
          rewardsPerWeekFixed: rewardsPerWeek,
          pendingRewardsFunction: "pendingCake",
          deathPoolIndices: [1]
        });
        if (response.status === "completed") {
          const { result } = response
          const formattedResult = result.filter(item => {
            return item.poolToken
          }).map((item) => {
            console.log("item::", item)
            const pair = get(item, ["poolPrice", "stakeTokenTicker"], null) !== null ?
              get(item, ["poolPrice", "stakeTokenTicker"]) : `${get(item, ["poolPrice", "t0", "symbol"])}-${get(item, ["poolPrice", "t1", "symbol"])}`
            const rewardPerWeek = get(item, ["poolRewardsPerWeek"])
            const rewardPrice = get(item, ["rewardPrice"])
            const lpPrice = get(item, ["poolPrice", "price"]) || rewardPrice
            const totalStaked = get(item, ["poolToken", "staked"])
            const weeklyAPR = (rewardPerWeek * rewardPrice) / (totalStaked * lpPrice) * 100;
            const dailyAPR = weeklyAPR / 7;
            const yearlyAPR = weeklyAPR * 52;
            return {
              rewardToken: "CAKE",
              poolName: get(item, ["poolToken", "name"]),
              lpPrice: lpPrice,
              tvlUsd: get(item, ["poolPrice", "tvl"]),
              totalStaked: totalStaked,
              rewardPerWeek: rewardPerWeek,
              rewardPrice: rewardPrice,
              pair: pair,
              APR: { weeklyAPR, dailyAPR, yearlyAPR },
              userStaked: get(item, ["userStaked"])
            }
          })
          setPool(formattedResult)
          setLoading(false)
        }
      }
    })()
  }, [bscPrices, web3Provider])
  return (
    <>
      <Card className="glass" style={{ padding: 30, marginBottom: 20 }}>
        <Row>
          <div className="d-flex align-items-center">
            <img
              src="/image/protocal/pancake.png"
              alt="Token Icon"
              className="img-fluid mr-2"
              style={{
                height: "40px",
              }}
            />
            <span className="header-title">
              <a href={META.OFFICIAL_SITE} target="_blank" style={{ color: "black" }}>
                Pancake swap
              </a>
            </span>
          </div>
          <div className="ml-4 d-flex align-items-center">
            <Form >
              <Form.Check
                type="checkbox"
                label="Hide Unstake LP"
              />
            </Form>
          </div>
        </Row>
        {isLoading ? (
          <>
            <div className="d-flex justify-content-center align-items-center w-100 mt-5 mb-4">
              <div className="d-flex align-items-center">
                <Spinner animation="border" />
                <span className="p-2">fetching protocal</span>
              </div>
            </div>
          </>
        ) : (
          <Row style={{ padding: 15 }}>
            {pool.map((item, index) => {
              return (
                <Col key={index} md="12" style={{ marginBottom: 10 }} >
                  <LPCard lp={item} ></LPCard>
                </Col>)
            })}
          </Row>
        )}
      </Card>
    </>
  );
}