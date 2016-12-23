import { combineReducers } from 'redux'

import grid from './grid'
import players from './players'
import pickingPlayer from './pickingPlayer'

const squaresApp = combineReducers({
  grid,
  players,
  pickingPlayer
})

export default squaresApp
