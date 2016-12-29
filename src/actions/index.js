import { createAction } from 'redux-actions'

// TODO use Immutable Maps for actions? Framework might not like that. At least should be consistant

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
export const fetchGames = createAction('FETCH_GAMES')

// Teams
// TODO put these in own file?

export const invalidateTeams = createAction('INVALIDATE_TEAMS')
export const fetchTeams = createAction('FETCH_TEAMS')
export const addTeam = createAction('ADD_TEAM', name => ({name}))
export const receiveTeams = createAction('RECEIVE_TEAMS')
