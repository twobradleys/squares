import Immutable from 'immutable'

const dims = Immutable.Range(0, 10).toList()
const emptyGrid = dims.map(() => dims.map(() => null))

const grid = (state = emptyGrid, action) => {
  switch (action.type) {
    case 'CLICK_GRID_SQUARE':
      // TODO splice that ish
      return state
    default:
      return state
  }
}

export default grid
