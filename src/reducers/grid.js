import Immutable from 'immutable'
import shuffleSeed from 'shuffle-seed'

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
        .update('players', players => players.push(Immutable.Map({id: action.id, name: action.name})))
        .set('pickingPlayerId', action.id)

    case 'SELECT_PLAYER':
      // Acts as a toggle; either set a new picking player, or "turn off" the current one
      if (state.get('pickingPlayerId') === action.id) {
        return state.set('pickingPlayerId', null)
      } else {
        return state.set('pickingPlayerId', action.id)
      }

    case 'CLICK_GRID_SQUARE':
      return state.setIn(['entries', action.i, action.j], state.get('pickingPlayerId'))

    case 'MAKE_QUICK_PICKS': {
      const pickingPlayerId = state.get('pickingPlayerId')
      const squares = state.get('entries').flatMap((row, i) => row.map((owner, j) => Immutable.Map({i, j, owner})))
      const unclaimedSquares = squares.filter(square => square.get('owner') === null) // TODO maybe you can destructure these maps?
      const quickPickSquares = Immutable.fromJS(shuffleSeed.shuffle(unclaimedSquares.toJS(), action.seed)).take(action.count)
      return state
        .update('entries', entries =>
          quickPickSquares.reduce((e, square) =>
            e.setIn([square.get('i'), square.get('j')], pickingPlayerId),
                               entries))
    }

    default:
      return state
  }
}

export default grid
