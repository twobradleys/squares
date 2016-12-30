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


// players

function* getAllPlayers() {
  try {
    const players = yield call(api.getPlayers)
    yield put(actions.receivePlayers(players))
  } catch (error) {
    yield put(actions.receivePlayersFailed(error))
  }
}

// TODO rename to watchFetchPlayers?
function* watchGetAllPlayers() {
  // TODO only allow one refresh one at a time? Or let state handle that?
  yield takeEvery('FETCH_PLAYERS', getAllPlayers)
}

function* periodicallyGetAllPlayers() {
  while (true) {
    yield put(actions.fetchPlayers())
    yield call(delay, 2000)
  }
}

function* createPlayer(action) {
  yield put(actions.addPlayerProvisional(action.payload))
  yield call(api.createPlayer, action.payload)
  yield put(actions.fetchPlayers()) // refresh
}

function* watchCreatePlayer() {
  yield takeEvery('CREATE_PLAYER', createPlayer)
}

export default function* root() {
  yield [
    // TODO sort these
    //fork(periodicallyGetAllPlayers),
    fork(watchGetAllPlayers),
    fork(watchCreatePlayer),
    //fork(periodicallyGetAllTeams),
    fork(watchGetAllTeams),
    fork(watchCreateTeam),
//    fork(periodicallyGetAllGames),
    fork(watchGetAllGames),
  ]
}
