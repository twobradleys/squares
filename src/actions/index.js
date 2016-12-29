import { createAction } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'
import fetch from 'isomorphic-fetch'

// TODO use Immutable Maps for actions? Framework might not like that

import Immutable from 'immutable'

// Grid

let nextPlayerId = 0

export const addPlayer = createAction('ADD_PLAYER', name => ({id: nextPlayerId++, name}))
export const selectPlayer = createAction('SELECT_PLAYER', id => ({id}))
export const clickGridSquare = createAction('CLICK_GRID_SQUARE') // Payload is a map of { i, j }
export const makeQuickPicks = createAction('MAKE_QUICK_PICKS', count => ({count, seed: Math.random()}))
export const lockEntries = createAction('LOCK_ENTRIES', () => ({digitSeeds: Immutable.Map({home: Math.random(), away: Math.random()})}))

// Games
// TODO put these in own file?

export const invalidateGames = createAction('INVALIDATE_GAMES')

// NB: This actually generates FETCH_GAMES_STARTED, FETCH_GAMES_ENDED, and
// FETCH_GAMES_FAILED. It *does not* generate FETCH_GAMES
export const fetchGames = createActionThunk('FETCH_GAMES', () =>
  fetch('http://localhost:5200/v1/games').then(response => response.json())
)

// Closely based on  http://redux.js.org/docs/advanced/AsyncActions.html
function shouldFetchGames(state) {
  const games = state.get('games')
  if (games.get('items') === null) {
    return true // Never loaded
  } else if (games.get('isFetching')) {
    return false // Don't do multiple fetches at the same time
  } else {
    return games.get('didInvalidate') // Only load if invalid
  }
}

export function fetchGamesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState())) {
      return dispatch(fetchGames())
    } else {
      return Promise.resolve()
    }
  }
}

// Teams
// TODO put these in own file?

export const invalidateTeams = createAction('INVALIDATE_TEAMS')

export const fetchTeams = createActionThunk('FETCH_TEAMS', () =>
  fetch('http://localhost:5200/v1/teams/by-sport/football').then(response => response.json())
)

// TODO this is a really weird call signature and feels nasty
const postTeam = createActionThunk('POST_TEAM', ({name, thenFn}) =>
  fetch('http://localhost:5200/v1/team', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name, sport: 'football'})
  }).then(thenFn)
)

// wrapper for postTeam that also triggers a refresh
export function addTeam({name}) {
  return (dispatch, getState) => {
    dispatch(postTeam({name, thenFn: () => dispatch(fetchTeams())}))
  }
}
