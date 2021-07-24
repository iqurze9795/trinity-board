import { Component, createContext, ReactNode } from "react";

const ContextLayout = createContext({})

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <ContextLayout.Provider
        value={{}}
      >
        {{ children }}
      </ContextLayout.Provider >
    )
  }
}

export { Layout, ContextLayout }