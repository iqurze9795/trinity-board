import { Card, Row, Col } from "react-bootstrap";
import { ProtocalCard } from './ProtocalCard'
import Protocal from './schema/bsc.json'
export const ProtocalList = () => {
  return (
    <Card className="glass" style={{ minHeight: 500, padding: 30 }}>
      <Row>
        <div className="d-flex align-items-center">
          <img
            src="/image/chain/bsc-logo.png"
            alt="Token Icon"
            className="img-fluid mr-1"
            style={{
              height: "40px",
            }}
          />
          <span className="header-title">Binance smart chain</span>
        </div>
      </Row>
      <Row style={{ padding: 15 }}>
        {Protocal.map((item, index) => {
          return <Col md="3" >
            <ProtocalCard
              name={item["name"]}
              logo={item["logo"]}
              site={item["oficial-site"]}
            />
          </Col>
        })}
      </Row>
    </Card >
  )
}