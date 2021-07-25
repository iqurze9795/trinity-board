import { Button } from "react-bootstrap";
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  name: string;
  logo: string;
  site: string;
  path: string;
}

export const ProtocolCard = ({ name, logo, site, path }: Props) => {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push(path), [history]);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        className="btn-card ml-2"
        type="button"
        style={{ minWidth: 180 }}
        size="sm"
        onClick={handleOnClick}
      >
        <img className="chain-logo" src={logo}></img>
        {name}
      </Button>
    </div>
  )
}