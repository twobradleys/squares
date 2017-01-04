import { call, cancel, fork, put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { api } from '../services'
import * as actions from '../actions'

import Immutable from 'immutable'

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

function* clickEntryCell(action) {
  const away_index = action.payload.get('away_index')
  const home_index = action.payload.get('home_index')
  const player_id =  action.payload.get('player_id')
  const price = 51 // TODO
  const type = 'buy'
  const game_id = action.payload.get('game_id')

  // TODO buy square provisionally
  yield call(api.offers.create, {game_id, home_index, away_index, player_id, price, type})
  yield put(actions.fetchCellsForGame(Immutable.Map({id: game_id})))
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

// slight hack - we are using a "nav" change to fire off a fetch event as a side effect. better way to do this?
function* handleJoinGame() {
  yield takeEvery('JOIN_GAME', fetchCellsForGame)
}

// TODO push click up to the view layer and change this to "buy" / "sell" / whatever
function* handleClickEntryCell() {
  yield takeEvery('CLICK_ENTRY_CELL', clickEntryCell)
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
    fork(handleClickEntryCell),
    fork(periodicallyFetchEntities, 'games'),
    fork(periodicallyFetchEntities, 'players'),
    fork(periodicallyFetchEntities, 'teams'),
    // TODO poll cells
  ]
}
