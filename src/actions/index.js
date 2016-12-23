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
