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

// TODO put each of these in own file?
// TODO invalidations are unused, keep them around?


// Games
export const invalidateGames = createAction('INVALIDATE_GAMES')
export const fetchGames = createAction('FETCH_GAMES')
export const receiveGames = createAction('RECEIVE_GAMES')

// Players
export const invalidatePlayers = createAction('INVALIDATE_PLAYERS')
export const fetchPlayers = createAction('FETCH_PLAYERS')
export const createPlayer = createAction('CREATE_PLAYER', handle => ({handle}))
export const receivePlayers = createAction('RECEIVE_PLAYERS')
export const addPlayerProvisional = createAction('ADD_PLAYER_PROVISIONAL')
export const receivePlayersFailed = createAction('RECEIVE_PLAYERS_FAILED')

// Teams
export const invalidateTeams = createAction('INVALIDATE_TEAMS')
export const fetchTeams = createAction('FETCH_TEAMS')
export const createTeam = createAction('CREATE_TEAM', name => ({name}))
export const receiveTeams = createAction('RECEIVE_TEAMS')
export const addTeamProvisional = createAction('ADD_TEAM_PROVISIONAL')
