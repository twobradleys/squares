import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { api } from '../services'
import * as actions from '../actions'

function* getAllTeams() {
  const teams = yield call(api.getTeams)
  yield put(actions.receiveTeams(teams))
  // TODO error handling
}

function* watchGetAllTeams() {
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

export default function* root() {
  yield [
    fork(getAllTeams), // fire this off once at initialization
    fork(watchGetAllTeams),
    fork(watchCreateTeam)
  ]
}
