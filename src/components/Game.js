import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Game = ({ game }) => (
  <div className='flexColumn'>
    <span>{game.get('eventName')}</span>
  </div>
)

Game.propTypes = {
  game: ImmutablePropTypes.contains({
    eventName: PropTypes.string.isRequired
  }).isRequired
}

export default Game
