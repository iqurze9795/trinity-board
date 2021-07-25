import { Card, Row, Col } from "react-bootstrap";
import { ProtocalCard } from './ProtocalCard'
import BscProtocal from './schema/bsc.json'
import PolygonProtocal from './schema/polygon.json'

export const ProtocalList = () => {
  return (
    <>
      <h4 style={{ color: "white", marginBottom: 15 }}>Support Protocals</h4>
      <Card className="glass" style={{ padding: 30, marginBottom: 20 }}>
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
            <span className="header-title">Binance smart chain ({BscProtocal.length})</span>
          </div>
        </Row>
        <Row style={{ padding: 15 }}>
          {BscProtocal.map((item, index) => {
            return <Col md="3" style={{ marginBottom: 10 }} >
              <ProtocalCard
                name={item["name"]}
                logo={item["logo"]}
                site={item["oficial-site"]}
              />
            </Col>
          })}
        </Row>
      </Card >
      <Card className="glass" style={{ padding: 30 }}>
        <Row>
          <div className="d-flex align-items-center">
            <img
              src="/image/chain/matic-icon.png"
              alt="Token Icon"
              className="img-fluid mr-1"
              style={{
                height: "40px",
              }}
            />
            <span className="header-title">Polygon chain ({PolygonProtocal.length})</span>
          </div>
        </Row>
        <Row style={{ padding: 15 }}>
          {PolygonProtocal.map((item, index) => {
            return <Col md="3" style={{ marginBottom: 10 }} >
              <ProtocalCard
                name={item["name"]}
                logo={item["logo"]}
                site={item["oficial-site"]}
              />
            </Col>
          })}
        </Row>
      </Card >
    </>
  )
}