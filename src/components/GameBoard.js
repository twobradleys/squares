import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

/*


import GameInfo from './GameInfo'
import CurrentPicker from '../containers/CurrentPicker'
import EnrolledPlayerList from '../containers/EnrolledPlayerList'
import AddPlayer from '../containers/AddPlayer'
import LockEntries from '../containers/LockEntries'


const PlayGame = () => (
  <div className="FlexColumn">
    <div className="FlexRow">
      <Grid />
      <GameInfo />
    </div>
    <EnrolledPlayerList />
    <AddPlayer />
    <CurrentPicker />
    <LockEntries />
  </div>
)
*/

import Grid from './Grid'

const GameBoard = ({ game, fetchCellsForGame }) => (
  <div>
    <h1>{game.get('event_name')}</h1>
    <button onClick={() => fetchCellsForGame(game)}>Load cells</button>
    <Grid />
  </div>
)

GameBoard.propTypes = {
  game: ImmutablePropTypes.contains({
    event_name: PropTypes.string.isRequired
  }).isRequired,
  fetchCellsForGame: PropTypes.func.isRequired
}

export default GameBoard
