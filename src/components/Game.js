import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Game = ({ game }) => (
  <div className='flexColumn'>
    <div>{game.get('event_name')}</div>
  </div>
)

Game.propTypes = {
  game: ImmutablePropTypes.contains({
    event_name: PropTypes.string.isRequired
  }).isRequired
}

export default Game
