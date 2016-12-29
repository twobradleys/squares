import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { IndexRoute, Route, Router, browserHistory } from 'react-router'
import App from './App'
import ServerGameList from '../containers/ServerGameList'
import ServerTeamList from '../containers/ServerTeamList'
import Home from '../components/Home'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/games" component={ServerGameList} />
        <Route path="/teams" component={ServerTeamList} />
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
