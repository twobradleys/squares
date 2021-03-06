import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import EntityLastUpdated from './EntityLastUpdated'
import Player from './Player'

// TODO dry out with GameList and TeamList
const PlayerList = ({ playersState, fetchPlayers, createPlayer, signIn }) => (
  <div className='FlexColumn'>
    {playersState.get('items').size === 0 ? <div><i>No Players</i></div> : null}
    {playersState.get('items').map((player,i) => <Player key={i} player={player} signIn={signIn} />)}
    <br />
    {/* TODO only show fetching... if it has been up for 200ms+ (to avoid flashing) */}
    <div>{playersState.get('isFetching') ? 'Fetching...' : ''}</div>
    <EntityLastUpdated lastUpdated={playersState.get('lastUpdated')} />
    <button className='pure-button' onClick={fetchPlayers}>Refresh</button>
    <button className='pure-button' onClick={() => createPlayer({handle: window.prompt("Player name?")})}>Add Player</button>
  </div>
)

PlayerList.propTypes = {
  playersState: ImmutablePropTypes.contains({
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.instanceOf(Date),
    players: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        id: PropTypes.string,
        handle: PropTypes.string.isRequired
      }).isRequired
    )
  }),
  fetchPlayers: PropTypes.func.isRequired,
  createPlayer: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
}

export default PlayerList
