import { createAction } from 'redux-actions'

import Immutable from 'immutable'

// Entities
export const fetchEntities = createAction('FETCH_ENTITIES')
export const createEntity = createAction('CREATE_ENTITY')
export const receiveEntities = createAction('RECEIVE_ENTITIES')
export const addEntityProvisional = createAction('ADD_ENTITY_PROVISIONAL')
export const receiveEntitiesFailed = createAction('RECEIVE_ENTITIES_FAILED')

// Grid

let nextPlayerId = 0

export const addPlayer = createAction('ADD_PLAYER', name => ({id: nextPlayerId++, name}))
export const selectPlayer = createAction('SELECT_PLAYER', id => ({id}))
export const clickGridSquare = createAction('CLICK_GRID_SQUARE') // Payload is a map of { i, j }
export const makeQuickPicks = createAction('MAKE_QUICK_PICKS', count => ({count, seed: Math.random()}))
export const lockEntries = createAction('LOCK_ENTRIES', () => ({digitSeeds: Immutable.Map({home: Math.random(), away: Math.random()})}))


// Session state
export const signIn = createAction('SIGN_IN')
