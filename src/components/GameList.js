import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import EntityLastUpdated from './EntityLastUpdated'
import Game from './Game'

const GameList = ({ gamesState, fetchGames, joinGame }) => (
  <div className='FlexColumn'>
    {gamesState.get('items') === null ? <div><i>No Games</i></div> : gamesState.get('items').map((game,i) => <Game key={i} game={game} joinGame={joinGame} />)}
    <br />
    <div>{gamesState.get('isFetching') ? 'Fetching...' : ''}</div>
    <EntityLastUpdated lastUpdated={gamesState.get('lastUpdated')} />
    <button className='pure-button' onClick={fetchGames}>Refresh</button>
  </div>
)

GameList.propTypes = {
  gamesState: ImmutablePropTypes.contains({
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.instanceOf(Date),
    items: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        event_name: PropTypes.string.isRequired
      })
    )
  }),
  fetchGames: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired
}

export default GameList
