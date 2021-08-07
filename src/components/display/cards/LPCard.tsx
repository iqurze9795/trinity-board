import React, { useMemo } from "react";
import { Card, Row, Col } from "react-bootstrap";

interface Props {
  lp: any;
}

const LPCard = ({ lp }: Props) => {

  const poolName = useMemo(() => {
    if (lp.token1Symbol === "") return `${lp.token0Symbol} LP`;
    else return `${lp.token1Symbol}-${lp.token0Symbol} LP`;
  }, [lp]);

  return (
    <Card
      className="mb-4 fade-list lp-card"
    >
      <Card.Body>
        <Row>
          <Col md={12} lg={12}>
            <div className="d-flex align-items-start justify-content-lg-start justify-content-center ml-0 ml-lg-4">
              <img src="/image/pair/wad-bnb.png" alt="" />
              <div
                className="d-flex align-items-center align-items-lg-start flex-column ml-3"
                style={{
                  fontWeight: 300,
                }}
              >
                Warden-BNB
                <br />
                <Row className="pl-3">
                  <small className="text-label pr-2">
                    LP Price:
                  </small>
                  <span className="text-info">
                    $26.30
                  </span>
                </Row>
                <Row className="pl-3">
                  <small className="text-label pr-2">
                    TVL:
                  </small>
                  <span className="text-info">
                    $11,443,608.37
                  </span>
                </Row>
                <Row className="pl-3">
                  <small className="text-label pr-2">
                    Staked:
                  </small>
                  <span className="text-info">
                    16095368.9797 Warden ($6,724,837.87)
                  </span>
                </Row>
                <Row className="pl-3">
                  <small className="text-label pr-2">
                    WAD Per Week:
                  </small>
                  <span className="text-info">
                    61714.29 ($25,784.97)
                  </span>
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
