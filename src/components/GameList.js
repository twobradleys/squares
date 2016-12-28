import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Game from './Game'

const GameList = ({ games }) => (
  <div className='flexRow'>
    {games.map((game,i) => <Game key={i} game={game} />)}
  </div>
)

GameList.propTypes = {
  games: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      eventName: PropTypes.string.isRequired
    }).isRequired
  )
}

export default GameList
