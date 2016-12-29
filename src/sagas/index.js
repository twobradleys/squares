import { call, fork, put } from 'redux-saga/effects'
import { api } from '../services'
import * as actions from '../actions'

function* getAllTeams() {
  const teams = yield call(api.getTeams)
  yield put(actions.receiveTeams(teams))
}

export default function* root() {
  yield [
    fork(getAllTeams)
  ]
}
