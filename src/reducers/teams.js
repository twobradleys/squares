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
  'FETCH_TEAMS': (state, action) => {
    return state.set('didInvalidate', true).set('isFetching', true)
  },
  'RECEIVE_TEAMS': (state, action) => {
    return state.set('teams', Immutable.fromJS(action.payload))
                .set('isFetching', false)
                .set('didInvalidate', false)
                .set('lastUpdated', new Date())
  },
  'ADD_TEAM_PROVISIONAL': (state, action) => {
    return state.update('teams', teams => teams.push(Immutable.Map(action.payload)))
  }
}, initialState)

export default teams
