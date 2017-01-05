import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialEntityState = Immutable.Map({
  isFetching: false,
  lastUpdated: null,
  items: Immutable.List(),
})

const entityPath = (action) =>
  [action.payload.entityType, action.payload.collectionId].filter(x => x)

const updateEntities = (state, action, fn) =>
  state.updateIn(entityPath(action), fn)

const entities = handleActions({
  'INITIALIZE_ENTITY': (state, action) =>
    updateEntities(state, action, entities => entities || initialEntityState),

  'WAITING_FOR_FETCH_ENTITIES': (state, action) =>
    updateEntities(state, action, entities => entities.set('isFetching', true)),

  'RECEIVE_ENTITIES': (state, action) =>
    updateEntities(state, action, entities =>
      entities.set('isFetching', false)
              .set('lastUpdated', new Date())
              .set('items', Immutable.fromJS(action.payload.items))), // TODO push fromJS down to API?

  'ADD_ENTITY_PROVISIONAL': (state, action) =>
    updateEntities(state, action, entities =>
      entities.update('items', items => items.push(Immutable.Map(action.payload.newEntity))))

}, Immutable.Map())

export default entities
