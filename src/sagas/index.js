import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { api } from '../services'
import * as actions from '../actions'

// api call wrappers

function* fetchEntities(action) {
  const entityType = action.payload.entityType

  try {
    const items = yield call(api[entityType].fetch)
    yield put(actions.receiveEntities({entityType, items}))
  } catch (error) {
    yield put(actions.receiveEntitiesFailed({entityType, error}))
  }
}

function* createEntity(action) {
  const payload = action.payload
  const entityType = payload.entityType
  yield put(actions.addEntityProvisional(payload))
  yield call(api[entityType].create, action.payload.newEntity)
  yield put(actions.fetchEntities({entityType})) // refresh
}

// action handlers

function* handleFetchEntities() {
  // TODO only allow one refresh one at a time? Or let state handle that?
  yield takeEvery('FETCH_ENTITIES', fetchEntities)
}

function* handleCreateEntity() {
  yield takeEvery('CREATE_ENTITY', createEntity)
}

// timers

function* periodicallyFetchEntities(entityType) {
  // TODO start/stop these based on whether or not the list is visible
  while (true) {
    yield put(actions.fetchEntities({entityType}))
    yield call(delay, 2000)
  }
}


export default function* root() {
  yield [
    fork(handleCreateEntity),
    fork(handleFetchEntities),
//    fork(periodicallyFetchEntities, 'players'),
    //fork(periodicallyFetchEntities, 'teams'),
  ]
}
