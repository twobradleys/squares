import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable.Map({
  playerId: null
})

const session = handleActions({
  'SIGN_IN': (state, action) =>
    state.set('playerId', action.payload.get('id'))
}, initialState)

export default session
