import Immutable from 'immutable'
import shuffleSeed from 'shuffle-seed'
import { findUnclaimedSquares } from '../selectors'

const dims = Immutable.Range(0, 10).toList()
const noEntries = dims.map(() => dims.map(() => null))

const initialState = Immutable.Map({
  entries: noEntries,
  locked: false,
  players: Immutable.List(),
  pickingPlayerId: null,
})

const grid = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_PLAYER': {
      return state
        .update('players', players => players.push(Immutable.Map({id: action.id, name: action.name})))
        .set('pickingPlayerId', action.id)
    }

    case 'SELECT_PLAYER': {
      // Acts as a toggle; either set a new picking player, or "turn off" the current one
      const pickingPlayerId = state.get('pickingPlayerId')
      if (pickingPlayerId === action.id) {
        return state.set('pickingPlayerId', null)
      } else {
        return state.set('pickingPlayerId', action.id)
      }
    }

    case 'CLICK_GRID_SQUARE': {
      return state.setIn(['entries', action.i, action.j], state.get('pickingPlayerId'))
    }

    case 'MAKE_QUICK_PICKS': {
      const pickingPlayerId = state.get('pickingPlayerId')
      const unclaimedSquares = findUnclaimedSquares(state.get('entries'))
      const quickPickSquares = Immutable.fromJS(shuffleSeed.shuffle(unclaimedSquares.toJS(), action.seed)).take(action.count)
      return state
        .update('entries', entries =>
          quickPickSquares.reduce((e, square) =>
            e.setIn([square.get('i'), square.get('j')], pickingPlayerId),
                               entries))
    }

    case 'LOCK_ENTRIES': {
      return state.set('pickingPlayerId', null).set('locked', true)
      // TODO generate and display digits
    }

    default: {
      return state
    }
  }
}

export default grid
