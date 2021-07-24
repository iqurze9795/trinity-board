import React from "react"
import { Home } from './pages/home'
import { Farm } from './pages/farm'
import { history } from "./history"
import { Router, Switch, Route } from "react-router-dom"

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/farm" component={Farm} />
        </Switch>
      </Router>
    )
  }
}

export { AppRouter }