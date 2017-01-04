import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialEntityState = Immutable.Map({
  isFetching: false,
  lastUpdated: null,
  items: Immutable.List(),
})

const initialState = Immutable.Map({
  // TODO do i need to dup these? shouldn't have to but maybe this creates coupling?
  cells: initialEntityState,
  games: initialEntityState,
  players: initialEntityState,
  teams: initialEntityState,
})

const entities = handleActions({
  // TODO generalize to all API calls
  'WAITING_FOR_FETCH_ENTITIES': (state, action) =>
    state.update(action.payload.entityType, entities =>
      entities.set('isFetching', true)),

  'RECEIVE_ENTITIES': (state, action) =>
    state.update(action.payload.entityType, entities =>
      entities.set('isFetching', false)
              .set('lastUpdated', new Date())
              .set('items', Immutable.fromJS(action.payload.items))), // TODO push fromJS down to API?

  'ADD_ENTITY_PROVISIONAL': (state, action) =>
    state.update(action.payload.entityType, entities =>
      entities.update('items', items => items.push(Immutable.Map(action.payload.newEntity))))
}, initialState)

export default entities
