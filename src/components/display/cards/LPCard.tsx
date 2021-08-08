import { Card, Row, Col } from "react-bootstrap";
import BigNumber from 'bignumber.js'

interface Props {
  lp: any;
}

const LPCard = ({ lp }: Props) => {
  return (
    <Card
      className="mb-4 fade-list lp-card"
    >
      <Card.Body>
        <Row>
          <Col md={12} lg={12}>
            <div className="d-flex align-items-start justify-content-lg-start justify-content-center ml-0 ml-lg-4 mb-2">
              <div style={{ minWidth: 120 }}>
                <img onError={(ev) => { ev.currentTarget.src = "/image/pair/unknown-pair.png" }} src={`/image/pair/${lp.pair.toLowerCase()}.png`} alt="" />
              </div>
              <div
                className="d-flex align-items-center align-items-lg-start flex-column ml-3"
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {lp.pair}
                <br />
                <Row className="pl-3">
                  <small className="text-label pr-2">
                    LP Price:
                  </small>
                  <span className="text-info">
                    ${new BigNumber(lp.lpPrice).toFormat(2)}
                  </span>
                </Row>
                {/* <Row className="pl-3">
                  <small className="text-label pr-2">
                    TVL:
                  </small>
                  <span className="text-info">
                    ${new BigNumber(lp.tvlUsd).toFormat(2)}
                  </span>
                </Row> */}
                <Row className="pl-3">
                  <small className="text-label pr-2">
                    Pool size:
                  </small>
                  <span className="text-info">
                    {new BigNumber(lp.totalStaked).toFormat(2)} LP (${new BigNumber(lp.totalStaked * lp.lpPrice).toFormat(2)})
                  </span>
                </Row>
                <Row className="pl-3">
                  <small className="text-label pr-2">
                    {lp.rewardToken} rewards Per Week:
                  </small>
                  <span className="text-info">
                    {new BigNumber(lp.rewardPerWeek).toFormat(2)} {lp.rewardToken} (${new BigNumber(lp.rewardPerWeek * lp.rewardPrice).toFormat(2)})
                  </span>
                </Row>
                <Row className="pl-3 pt-2">
                  <small className="text-label pr-2">
                    APR:
                  </small>
                  <Card
                    className="btn-card pl-2 pr-2 mr-2"
                    style={{ minWidth: 70 }}
                  >
                    {/* <img className="chain-logo" src={logo}></img> */}
                    <small className="d-flex justify-content-center">Day: {new BigNumber(lp.APR.dailyAPR).toFormat(2)}%</small>
                  </Card>
                  <Card
                    className="btn-card pl-2 pr-2 mr-2"
                    style={{ minWidth: 70 }}
                  >
                    {/* <img className="chain-logo" src={logo}></img> */}
                    <small className="d-flex justify-content-center">Week: {new BigNumber(lp.APR.weeklyAPR).toFormat(2)}%</small>
                  </Card>
                  <Card
                    className="btn-card pl-2 pr-2"
                    style={{ minWidth: 70 }}
                  >
                    {/* <img className="chain-logo" src={logo}></img> */}
                    <small className="d-flex justify-content-center">Year: {new BigNumber(lp.APR.yearlyAPR).toFormat(2)}%</small>
                  </Card>
                </Row>
              </div>

            </div>
            <hr className="d-lg-none d-block" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LPCard;
