import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { IndexRoute, Route, Router, browserHistory } from 'react-router'
import Nav from '../containers/Nav'
import ServerGameList from '../containers/ServerGameList'
import ServerPlayerList from '../containers/ServerPlayerList'
import ServerTeamList from '../containers/ServerTeamList'
import Home from '../components/Home'
import PlayGame from '../containers/PlayGame'
import { readyToPlay } from '../selectors'

const onEnterPlayGame = (store) => (nextState, replace) => {
  if (!readyToPlay(store.getState())) {
    // redirect to home i guess
    replace('/')
  }
}

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Nav}>
        <IndexRoute component={Home} />
        <Route path="/games" component={ServerGameList} />
        <Route path="/players" component={ServerPlayerList} />
        <Route path="/teams" component={ServerTeamList} />
        <Route path="/play" component={PlayGame} onEnter={onEnterPlayGame(store)} />
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
