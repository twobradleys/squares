import Immutable from 'immutable'

const dims = Immutable.Range(0, 10).toList()
const noEntries = dims.map(() => dims.map(() => null))

const initialState = Immutable.Map({
  entries: noEntries,
  players: Immutable.List(),
  pickingPlayerId: null,
})

const grid = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_PLAYER':
      return state
        .updateIn(['players'], players => players.push(Immutable.Map({id: action.id, name: action.name})))
        .setIn(['pickingPlayerId'], action.id)

    case 'SELECT_PLAYER':
      return state.setIn(['pickingPlayerId'], action.id)

    case 'CLICK_GRID_SQUARE':
      return state.setIn(['entries', action.i, action.j], state.get('pickingPlayerId'))

    default:
      return state
  }
}

export default grid
