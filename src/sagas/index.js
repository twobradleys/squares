import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { api } from '../services'
import * as actions from '../actions'

function* getAllTeams() {
  const teams = yield call(api.getTeams)
  yield put(actions.receiveTeams(teams))
  // TODO error handling
}

// TODO rename to watchFetchTeams?
function* watchGetAllTeams() {
  // TODO only allow one refresh one at a time? Or let state handle that?
  yield takeEvery('FETCH_TEAMS', getAllTeams)
}

function* periodicallyGetAllTeams() {
  while (true) {
    yield put(actions.fetchTeams())
    yield call(delay, 2000)
  }
}

function* createTeam(action) {
  yield put(actions.addTeamProvisional(action.payload))
  yield call(api.createTeam, action.payload)
  yield put(actions.fetchTeams()) // refresh
}

function* watchCreateTeam() {
  yield takeEvery('CREATE_TEAM', createTeam)
}

function* getAllGames() {
  const games = yield call(api.getGames)
  yield put(actions.receiveGames(games))
  // TODO error handling
}

function* watchGetAllGames() {
  yield takeEvery('FETCH_GAMES', getAllGames)
}

// TODO start/stop these based on whether or not the list is visible
function* periodicallyGetAllGames() {
  while (true) {
    yield put(actions.fetchGames())
    yield call(delay, 2000)
  }
}

export default function* root() {
  yield [
    fork(periodicallyGetAllTeams),
    fork(watchGetAllTeams),
    fork(watchCreateTeam),
    fork(periodicallyGetAllGames),
    fork(watchGetAllGames),
  ]
}
