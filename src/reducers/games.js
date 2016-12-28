import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable.Map({
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  games: Immutable.List([]),
})

const games = handleActions({
  'INVALIDATE_GAMES': (state, action) => {
    return state.set('didInvalidate', true)
  },
  'FETCH_GAMES_STARTED': (state, action) => {
    return state.set('didInvalidate', true).set('isFetching', true)
  },
  'FETCH_GAMES_ENDED': (state, action) => {
    return state.set('games', Immutable.fromJS(action.payload))
                .set('isFetching', false)
                .set('didInvalidate', false)
                .set('lastUpdated', new Date())
  },
  'FETCH_GAMES_FAILED': (state, action) => {
    // TODO figure out how to trigger/test this
    return state
  },
}, initialState)

export default games
