import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable.Map({
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  teams: Immutable.List([])
})

const teams = handleActions({
  'INVALIDATE_TEAMS': (state, action) => {
    return state.set('didInvalidate', true)
  },
  'FETCH_TEAMS_STARTED': (state, action) => {
    return state.set('didInvalidate', true).set('isFetching', true)
  },
  'FETCH_TEAMS_ENDED': (state, action) => {
    return state.set('teams', Immutable.fromJS(action.payload))
      .set('isFetching', false)
      .set('didInvalidate', false)
      .set('lastUpdated', new Date())
  },
  'FETCH_TEAMS_FAILED': (state, action) => {
    // TODO figure out how to trigger/test this
    return state
  },
}, initialState)

export default teams
