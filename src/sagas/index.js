import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { api } from '../services'
import * as actions from '../actions'

function* getAllTeams() {
  const teams = yield call(api.getTeams)
  yield put(actions.receiveTeams(teams))
  // TODO error handling
}

function* watchGetAllTeams() {
  // TODO only allow one refresh one at a time? Or let state handle that?
  yield takeEvery('FETCH_TEAMS', getAllTeams)
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

export default function* root() {
  yield [
    fork(getAllTeams),
    fork(watchGetAllTeams),
    fork(watchCreateTeam),
    fork(getAllGames),
    fork(watchGetAllGames),
  ]
}
