import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable.Map({
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  players: Immutable.List([])
})

const players = handleActions({
  'INVALIDATE_PLAYERS': (state, action) => {
    return state.set('didInvalidate', true)
  },
  'FETCH_PLAYERS': (state, action) => {
    return state.set('didInvalidate', true).set('isFetching', true)
  },
  'RECEIVE_PLAYERS': (state, action) => {
    return state.set('players', Immutable.fromJS(action.payload))
      .set('isFetching', false)
      .set('didInvalidate', false)
      .set('lastUpdated', new Date())
  },
  'ADD_PLAYER_PROVISIONAL': (state, action) => {
    return state.update('players', players => players.push(Immutable.Map(action.payload)))
  }
}, initialState)

export default players
