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

const GameBoard = ({ game, current_player_id, fetchCellsForGame }) => (
  <div>
    <h1>{game.get('event_name')}</h1>
    <button className='pure-button' onClick={() => fetchCellsForGame(game)}>Load cells</button>
    <Grid current_player_id={current_player_id} game_id={game.get('id')} />
  </div>
)

GameBoard.propTypes = {
  game: ImmutablePropTypes.contains({
    id: PropTypes.string.isRequired,
    event_name: PropTypes.string.isRequired
  }).isRequired,
  current_player_id: PropTypes.string.isRequired,
  fetchCellsForGame: PropTypes.func.isRequired
}

export default GameBoard
