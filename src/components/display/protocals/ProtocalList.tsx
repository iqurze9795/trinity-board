import { Card, Row, Col } from "react-bootstrap";
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
    </Card >
  )
}