import { Home } from './pages/home'
import { Farm } from './pages/farm'
import { Route } from 'react-router-dom'
import { Layout } from './utility/context/layout'
const App = () => {
  return (
    <div>
      {/* <Layout> */}
        <Route exact path="/" component={Home} />
        {/* <Route path="/farm" component={Farm} /> */}
      {/* </Layout> */}
    </div>
  )
};

export default App;
