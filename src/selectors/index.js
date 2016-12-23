import Immutable from 'immutable'
import { createSelector } from 'reselect'

const getEntries = (state) => state.getIn(['grid', 'entries'])

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
