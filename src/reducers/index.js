import { combineReducers } from 'redux-immutable'

import entities from './entities'

const squaresApp = combineReducers({
  entities
})

export default squaresApp
