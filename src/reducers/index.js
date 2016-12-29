import { combineReducers } from 'redux-immutable'

import games from './games'
import grid from './grid'
import teams from './teams'

const squaresApp = combineReducers({
  games,
  grid,
  teams
})

export default squaresApp
