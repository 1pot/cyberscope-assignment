import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import LoadingSpinner from './components/loading-spinner'

const CoinListPage = lazy(() => import('./pages/coins-list-page/index'))
const CoinDetailPage = lazy(() => import('./pages/coin-detail-page/index'))
const NotFoundPage = lazy(() => import('./pages/not-found-page/index'))

const App = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingSpinner />}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/coins" />
                    </Route>
                    <Route exact path="/coins" component={CoinListPage} />
                    <Route path="/coin/:id" component={CoinDetailPage} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default App
