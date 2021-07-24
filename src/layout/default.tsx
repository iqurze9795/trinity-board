import { Component, createContext } from "react";
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
          {children}
          <Footer />
        </div>
      </ContextLayout.Provider >
    )
  }
}

export { Layout, ContextLayout }