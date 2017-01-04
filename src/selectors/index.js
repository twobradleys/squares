import Immutable from 'immutable'
import { createSelector } from 'reselect'

const getCells = (state) =>
  state.getIn(['entities', 'cells', 'items'])

export const getCellsInGrid = createSelector(
  [ getCells ],
  ( cells ) => {
    const dims = Immutable.Range(0, 10).toList()
    const emptyGrid = dims.map(() => dims.map(() => Immutable.Map()))
    return cells.reduce((grid, cell) =>
      grid.setIn([cell.get('home_index'), cell.get('away_index')], cell)
                      , emptyGrid)
  }
)

/*
// TODO not a selector. want to factor out this cod to use in reducer, but ideally reducer would benefit from selector memoization as well
export const findUnclaimedSquares = (entries) =>
  entries
  .flatMap((row, i) => row.map((owner, j) => Immutable.Map({i, j, owner})))
  .filter(square => square.get('owner') === null)

export const getUnclaimedSquares = createSelector([ getEntries ], findUnclaimedSquares)

export const allSquaresClaimed = createSelector(
  [ getUnclaimedSquares ],
  ( unclaimedSquares ) => unclaimedSquares.size === 0
)
*/

export const getCurrentPlayer = (state) =>
  state.getIn(['entities', 'players', 'items']).find(player => player.get('id') === state.getIn(['session', 'playerId']))

export const getCurrentGame = (state) =>
  state.getIn(['entities', 'games', 'items']).find(game => game.get('id') === state.getIn(['session', 'gameId']))

export const readyToPlay = createSelector(
  [ getCurrentPlayer, getCurrentGame ],
  ( currentPlayer   , currentGame ) => (currentPlayer != null) && (currentGame != null)
)
