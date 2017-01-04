import { connect } from 'react-redux'
import { clickEntryCell } from '../actions'
import { getCellsInGrid } from '../selectors'
import Immutable from 'immutable'
import Cell from '../components/Cell'

const mapStateToProps = (state, ownProps) => {
  const cellsInGrid = getCellsInGrid(state)
  const entry = cellsInGrid.getIn([ownProps.i, ownProps.j])
  const ownerHandle = entry.get(['player', 'handle'])

  return {
    entry: entry,
    contents: (ownerHandle === 'house') ? '💵' : ownerHandle,
    active: false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(clickEntryCell(Immutable.Map({i: ownProps.i, j: ownProps.j}))),
})

const EntryCell = connect(mapStateToProps, mapDispatchToProps)(Cell)

export default EntryCell
