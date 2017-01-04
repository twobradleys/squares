import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable.Map({
  playerId: null,
  gameId: null,
})

const session = handleActions({
  'SIGN_IN': (state, action) =>
    state.set('playerId', action.payload.get('id')),

  'JOIN_GAME': (state, action) =>
    state.set('gameId', action.payload.get('id'))
}, initialState)

export default session
