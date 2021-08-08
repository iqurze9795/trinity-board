import React, { useMemo } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import BigNumber from 'bignumber.js'

interface Props {
  tvl: any;
  userStake: any
}

const TVLCard = ({ tvl, userStake }: Props) => {
  return (
    <Card
      className="mb-4 fade-list glass"
      style={{ minHeight: 300 }}
    >
      <Card.Body>
        <Row>
          <Col md={12} lg={12}>
            <div>Total value lock: ${`${new BigNumber(tvl).toFormat(2)}`}</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TVLCard;
