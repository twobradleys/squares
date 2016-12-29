import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable.Map({
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: null
})

const games = handleActions({
  'INVALIDATE_GAMES': (state, action) => {
    return state.set('didInvalidate', true)
  },
  'FETCH_GAMES': (state, action) => {
    return state.set('didInvalidate', true).set('isFetching', true)
  },
  'RECEIVE_GAMES': (state, action) => {
    return state.set('items', Immutable.fromJS(action.payload))
                .set('isFetching', false)
                .set('didInvalidate', false)
                .set('lastUpdated', new Date())
  }
}, initialState)

export default games
