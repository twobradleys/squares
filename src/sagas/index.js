import { call, cancel, fork, put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { api } from '../services'
import * as actions from '../actions'

// api call wrappers

function* fetchEntities(action) {
  const entityType = action.payload.entityType

  try {
    const fetchTimerTask = yield fork(startFetchTimer, {entityType})
    const items = yield call(api[entityType].fetch)
    yield cancel(fetchTimerTask)
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

function* fetchCellsForGame(action) {
  const id = action.payload.get('id')
  const items = yield call(api.cells.fetch, {id})
  const entityType = 'cells'
  yield put(actions.receiveEntities({entityType, items})) // TODO need to stash these by game id?
}

// action handlers

function* handleFetchEntities() {
  // TODO only allow one refresh one at a time? Or let state handle that?
  yield takeEvery('FETCH_ENTITIES', fetchEntities)
}

function* handleCreateEntity() {
  yield takeEvery('CREATE_ENTITY', createEntity)
}

function* handleFetchCellsForGame() {
  // TODO DRY out
  yield takeEvery('FETCH_CELLS_FOR_GAME', fetchCellsForGame)
}

// slight hack
function* handleJoinGame() {
  yield takeEvery('JOIN_GAME', fetchCellsForGame)
}

// timers

function* periodicallyFetchEntities(entityType) {
  // TODO start/stop these based on whether or not the list is visible
  while (true) {
    yield put(actions.fetchEntities({entityType}))
    yield call(delay, 3000) // TODO stagger
  }
}

function* startFetchTimer({entityType}) {
  yield call(delay, 200)
  yield put(actions.waitingForFetchEntities({entityType}))
}

export default function* root() {
  yield [
    fork(handleCreateEntity),
    fork(handleFetchEntities),
    fork(handleFetchCellsForGame),
    fork(handleJoinGame),
    fork(periodicallyFetchEntities, 'games'),
    fork(periodicallyFetchEntities, 'players'),
    fork(periodicallyFetchEntities, 'teams'),
    // TODO poll cells
  ]
}
