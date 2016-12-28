import { combineReducers } from 'redux-immutable'

import games from './games'
import grid from './grid'

// TODO use a reducer combiner that spits out an Immutable.Map instead
const squaresApp = combineReducers({
  games,
  grid
})

export default squaresApp
