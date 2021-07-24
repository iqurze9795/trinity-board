import { Component, createContext } from "react";
import { Container } from "react-bootstrap";
import Header from './components/Header'
import Footer from './components/Footer'
const ContextLayout = createContext({})

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <ContextLayout.Provider value={{}}>
        <div>
          <Header />
          <Container
            className="pb-4"
            style={{ minHeight: "calc(100vh - 10vh - 6vh)" }}
          >
            {children}
          </Container>
          <Footer />
        </div>
      </ContextLayout.Provider >
    )
  }
}

export { Layout, ContextLayout }