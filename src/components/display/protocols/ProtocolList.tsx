import { Card, Row, Col } from "react-bootstrap";
import { ProtocolCard } from './ProtocolCard'
import BscProtocol from './schema/bsc.json'
import PolygonProtocol from './schema/polygon.json'

export const ProtocolList = () => {
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
            <span className="header-title">Binance smart chain ({BscProtocol.length})</span>
          </div>
        </Row>
        <Row style={{ padding: 15 }}>
          {BscProtocol.map((item, index) => {
            return <Col md="3" style={{ marginBottom: 10 }} >
              <ProtocolCard
                name={item["name"]}
                logo={item["logo"]}
                site={item["oficial-site"]}
                path={item["path"]}
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
            <span className="header-title">Polygon chain ({PolygonProtocol.length})</span>
          </div>
        </Row>
        <Row style={{ padding: 15 }}>
          {PolygonProtocol.map((item, index) => {
            return <Col md="3" style={{ marginBottom: 10 }} >
              <ProtocolCard
                name={item["name"]}
                logo={item["logo"]}
                site={item["oficial-site"]}
                path={item["path"]}
              />
            </Col>
          })}
        </Row>
      </Card >
    </>
  )
}