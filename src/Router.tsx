import React from "react"
import { Home } from './pages/home'
import { Pool } from './pages/pool'
import { Cake } from './pages/protocol/pancake'
import { Warden } from './pages/protocol/warden'
import { Biswap } from './pages/protocol/biswap'
import { history } from "./history"
import { Router, Switch, Route } from "react-router-dom"

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Pool} />
          <Route exact path="/pool" component={Pool} />
          <Route exact path="/warden" component={Warden} />
          <Route exact path="/pancake" component={Cake} />
          <Route exact path="/biswap" component={Biswap} />
        </Switch>
      </Router>
    )
  }
}

export { AppRouter }