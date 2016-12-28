import Immutable from 'immutable'
import shuffleSeed from 'shuffle-seed'
import { findUnclaimedSquares } from '../selectors'
import { handleActions } from 'redux-actions'

const dims = Immutable.Range(0, 10).toList()
const noEntries = dims.map(() => dims.map(() => null))
const noDigits = dims.map(() => null)

const initialState = Immutable.Map({
  entries: noEntries,
  locked: false,
  players: Immutable.List(),
  pickingPlayerId: null,
  digits: Immutable.Map({home: noDigits, away: noDigits})
})

const grid = handleActions({
  ADD_PLAYER: (state, action) => {
    return state.update('players', players => players.push(Immutable.Map(action.payload)))
                .set('pickingPlayerId', action.payload.id)
  },

  SELECT_PLAYER: (state, action) => {
    // Acts as a toggle; either set a new picking player, or "turn off" the current one
    const pickingPlayerId = state.get('pickingPlayerId')
    if (pickingPlayerId === action.payload.id) {
      return state.set('pickingPlayerId', null)
    } else {
      return state.set('pickingPlayerId', action.payload.id)
    }
  },

  CLICK_GRID_SQUARE: (state, action) => {
    if (state.get('locked') === false) {
      return state.setIn(['entries', action.payload.i, action.payload.j], state.get('pickingPlayerId'))
    } else {
      return state
    }
  },

  MAKE_QUICK_PICKS: (state, action) => {
    const pickingPlayerId = state.get('pickingPlayerId')
    const unclaimedSquares = findUnclaimedSquares(state.get('entries'))
    const quickPickSquares = Immutable.fromJS(shuffleSeed.shuffle(unclaimedSquares.toJS(), action.payload.seed)).take(action.payload.count)
    return state
      .update('entries', entries =>
        quickPickSquares.reduce((e, square) =>
          e.setIn([square.get('i'), square.get('j')], pickingPlayerId),
                                entries))
  },

  'LOCK_ENTRIES': (state, action) => {
    const digits = action.payload.digitSeeds.map((team, seed) => Immutable.fromJS(shuffleSeed.shuffle(Immutable.Range(0,10).toJS(), seed)))
    return state.set('digits', digits).set('pickingPlayerId', null).set('locked', true)
  }
}, initialState)

export default grid
