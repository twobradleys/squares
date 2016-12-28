import { createAction } from 'redux-actions'

// TODO use Immutable Maps for actions? Framework might not like that

import Immutable from 'immutable'

let nextPlayerId = 0

export const addPlayer = createAction('ADD_PLAYER', name => ({id: nextPlayerId++, name}))
export const selectPlayer = createAction('SELECT_PLAYER', id => ({id}))
export const clickGridSquare = createAction('CLICK_GRID_SQUARE') // Payload is a map of { i, j }
export const makeQuickPicks = createAction('MAKE_QUICK_PICKS', count => ({count, seed: Math.random()}))
export const lockEntries = createAction('LOCK_ENTRIES', () => ({digitSeeds: Immutable.Map({home: Math.random(), away: Math.random()})}))
