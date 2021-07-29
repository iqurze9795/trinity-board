import { useEffect } from "react";
import { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
} from "react-bootstrap";
import { useWallet } from "../../hooks/useWallet";

const formatAddress = (address = ''): String => {
  const [start, end] = [address.substring(0, 5), address.substring((address.length - 5), address.length)]
  return `${start}...${end}`
}
const AddressForm = () => {
  const { address, connectWallet } = useWallet();


  return (
    <Form inline>
      {address === null || address === '' ? <Button
        variant="secondary"
        className="btn-primary ml-2"
        type="button"
        size="sm"
        onClick={connectWallet}
      >
        Connect wallet
      </Button> :
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="secondary"
            className="btn-primary ml-2"
            type="button"
            size="sm"
          >
            <img className="chain-logo" src='/image/chain/bsc.png'></img>
            {formatAddress(address)}
          </Button>
        </div>}
    </Form>
  );
};


const Header = () => {
  return (
    <Container style={{ minHeight: "6vh" }}>
      <Navbar variant="dark" expand="lg" className="px-0">
        <Navbar.Brand href="/">
          <img
            src="/logo.svg"
            height="30"
            className="d-inline-block align-top mr-1 p-1"
            style={{ marginLeft: -4 }}
          />
          <b
            style={{
              letterSpacing: 4,
              fontWeight: 600,
            }}
          >
            Trinity
          </b>{" "}
          <span
            style={{
              fontWeight: 200,
            }}
          >
            Board
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/pool">Pool</Nav.Link>
            <Nav.Link href="/">Twitter</Nav.Link>
            <Nav.Link href="/docs">Docs</Nav.Link>
            <Nav.Link href="/roadmap">Roadmap</Nav.Link>
          </Nav>
          <AddressForm />
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
