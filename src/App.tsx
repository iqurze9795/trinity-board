import { Home } from './pages/home'
import { Farm } from './pages/farm'
import { Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/farm" component={Farm} />
    </div>
  )
};

export default App;
