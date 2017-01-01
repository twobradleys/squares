import { combineReducers } from 'redux-immutable'

import entities from './entities'
import session from './session'

const squaresApp = combineReducers({
  entities,
  session
})

export default squaresApp
