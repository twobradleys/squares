import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Game from './Game'

const GameList = ({ games, fetchGames }) => (
  <div className='FlexRow'>
    <h1>Games</h1>
    <div>{games.get('isFetching') ? 'Fetching...' : ''}</div>
    {games.get('items') === null ? <div><i>No Games</i></div> : games.get('items').map((game,i) => <Game key={i} game={game} />)}
    <br />
    <div>Last Updated: {games.get('lastUpdated') !== null ? games.get('lastUpdated').toString() : 'never'}</div>
    <button onClick={fetchGames}>Refresh</button>
  </div>
)

GameList.propTypes = {
  games: ImmutablePropTypes.contains({
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.instanceOf(Date),
    items: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        event_name: PropTypes.string.isRequired
      })
    )
  }),
  fetchGames: PropTypes.func.isRequired
}

export default GameList
