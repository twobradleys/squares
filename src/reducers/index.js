import { combineReducers } from 'redux'

import grid from './grid'

// TODO use a reducer combiner that spits out an Immutable.Map instead
const squaresApp = combineReducers({
  grid
})

export default squaresApp
