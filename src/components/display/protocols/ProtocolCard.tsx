import { Button } from "react-bootstrap";
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  name: string;
  logo: string;
  isDisable: boolean;
  path: string;
}

export const ProtocolCard = ({ name, logo, isDisable, path }: Props) => {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push(path), [history]);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        className="btn-card ml-2"
        type="button"
        style={{ minWidth: 180 }}
        size="sm"
        disabled={isDisable}
        onClick={handleOnClick}
      >
        <img className="chain-logo" src={logo}></img>
        {name}
      </Button>
    </div>
  )
}