import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

const CoinListPage = lazy(() => import('./pages/coins-list-page/index'))
const CoinDetailPage = lazy(() => import('./pages/coin-detail-page/index'))

const App = () => {
    return (
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/coins" />
              </Route>
                <Route exact path="/coins" component={CoinListPage} />
                <Route path="/coin/:id" component={CoinDetailPage} />
            </Switch>
            </Suspense>
        </Router>
    )
}

export default App
