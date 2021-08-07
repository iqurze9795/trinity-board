import { useEffect } from "react";
import { useWallet } from "../../../hooks/useWallet";
import { Contract, ethers } from "ethers";
import { ABI, META } from './config'
import { useBscPrice } from "../../../hooks/bsc/useBscPrice";
import { chefContractHelper } from "../../../hooks/helper/bscContractHelper";
import { useState } from "react";
import { get } from "lodash";
import { Card, Row, Col, Spinner, Form } from "react-bootstrap";

//component
import LPCard from "../../../components/display/cards/LPCard";

const calculateRewards = async (contract: ethers.Contract): Promise<number> => {
  const multiplier = await contract.BONUS_MULTIPLIER();
  return await contract.wardenPerBlock() / 1e18
    * 604800 / 3 * multiplier;
}

export const Warden = () => {
  const { web3Provider, walletProvider, address } = useWallet();
  const [pool, setPool] = useState<Array<object>>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const bscPrices = useBscPrice();

  useEffect(() => {
    (async () => {
      if (web3Provider && bscPrices) {
        const wadContract = new ethers.Contract(META.CHEF_ADDRESS, ABI, web3Provider);
        const rewardsPerWeek = await calculateRewards(wadContract)
        setLoading(true)
        const response = await chefContractHelper({
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
        if (response.status === "completed") {
          const { result } = response
          const formattedResult = result.filter(item => {
            return item.poolToken
          }).map((item) => {
            const pair = get(item, ["poolPrice", "stakeTokenTicker"], null) !== null ?
              get(item, ["poolPrice", "stakeTokenTicker"]) : `${get(item, ["poolPrice", "t0", "symbol"])}-${get(item, ["poolPrice", "t1", "symbol"])}`
            return {
              rewardToken: "WAD",
              poolName: get(item, ["poolToken", "name"]),
              lpPrice: get(item, ["poolPrice", "price"]),
              tvlUsd: get(item, ["poolPrice", "tvl"]),
              totalStaked: get(item, ["poolToken", "staked"]),
              rewardPerWeek: get(item, ["poolRewardsPerWeek"]),
              rewardPrice: get(item, ["rewardPrice"]),
              pair: pair,
              APR: {},
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
              src="/image/protocal/warden.png"
              alt="Token Icon"
              className="img-fluid mr-2"
              style={{
                height: "40px",
              }}
            />
            <span className="header-title">
              <a href={META.OFFICIAL_SITE} target="_blank" style={{ color: "black" }}>
                Warden Swap
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