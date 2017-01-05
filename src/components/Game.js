import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Game = ({ game, joinGame }) => (
  <div className='FlexRow'>
    <div>{game.get('event_name')}</div><div><button className='pure-button' onClick={() => joinGame(game)}>Join</button></div>
  </div>
)

Game.propTypes = {
  game: ImmutablePropTypes.contains({
    event_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  joinGame: PropTypes.func.isRequired
}

export default Game
