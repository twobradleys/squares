import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Game from './Game'

const GameList = ({ gamesState, fetchGames }) => (
  <div className='flexRow'>
    <h1>Games</h1>
    {gamesState.get('games').size === 0 ? <div><i>No Games</i></div> : null}
    <div>{gamesState.get('isFetching') ? 'Fetching...' : ''}</div>
    {gamesState.get('games').map((game,i) => <Game key={i} game={game} />)}
    <br />
    <div>Last Updated: {gamesState.get('lastUpdated') !== null ? gamesState.get('lastUpdated').toString() : 'never'}</div>
    <button onClick={fetchGames}>Refresh</button>
  </div>
)

GameList.propTypes = {
  gamesState: ImmutablePropTypes.contains({
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.instanceOf(Date),
    games: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        event_name: PropTypes.string.isRequired
      }).isRequired
    )
  }),
  fetchGames: PropTypes.func.isRequired
}

export default GameList
