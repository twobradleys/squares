import { combineReducers } from 'redux-immutable'

import games from './games'
import grid from './grid'
import players from './players'
import teams from './teams'

const squaresApp = combineReducers({
  games,
  grid,
  players,
  teams
})

export default squaresApp
