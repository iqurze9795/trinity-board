import { Row, Card, Col, Button } from "react-bootstrap";
interface Props {
  name: string;
  logo: string;
  site: string;
}
const openProtocal = () => { }
export const ProtocalCard = ({ name, logo, site }: Props) => {

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="secondary"
        className="btn-card ml-2"
        type="button"
        style={{ minWidth: 180 }}
        size="sm"
      >
        <img className="chain-logo" src={logo}></img>
        {name}
      </Button>
    </div>
  )
}