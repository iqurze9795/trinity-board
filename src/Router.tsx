import React from "react"
import { Home } from './pages/home'
import { Pancake } from './pages/protocol/pancake'
import { history } from "./history"
import { Router, Switch, Route } from "react-router-dom"

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pancake" component={Pancake} />
        </Switch>
      </Router>
    )
  }
}

export { AppRouter }