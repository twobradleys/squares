// TODO use Immutable Maps for actions? Framework might not like that

import Immutable from 'immutable'

let nextPlayerId = 0;

export const addPlayer = (name) => ({
  type: 'ADD_PLAYER',
  id: nextPlayerId++,
  name
})

export const selectPlayer = (id) => ({
  type: 'SELECT_PLAYER',
  id
})

export const clickGridSquare = ({i, j}) => ({
  type: 'CLICK_GRID_SQUARE',
  i,
  j
})

export const makeQuickPicks = (count) => ({
  type: 'MAKE_QUICK_PICKS',
  count: count,
  seed: Math.random()
})

export const lockEntries = () => ({
  type: 'LOCK_ENTRIES',
  digitSeeds: Immutable.Map({home: Math.random(), away: Math.random()})
})
