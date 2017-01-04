import { connect } from 'react-redux'
import { PropTypes } from 'react'
import { clickEntryCell } from '../actions'
import { getCellsInGrid } from '../selectors'
import Immutable from 'immutable'
import Cell from '../components/Cell'

const mapStateToProps = (state, ownProps) => {
  const cellsInGrid = getCellsInGrid(state)
  const entry = cellsInGrid.getIn([ownProps.away_index, ownProps.home_index])
  const ownerHandle = entry.getIn(['player', 'handle'])

  return {
    contents: (ownerHandle === 'house') ? '💵' : ownerHandle,
    active: false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(clickEntryCell(Immutable.Map({
    away_index: ownProps.away_index,
    home_index: ownProps.home_index,
    player_id: ownProps.current_player_id,
    game_id: ownProps.game_id,
  }))),
})

const EntryCell = connect(mapStateToProps, mapDispatchToProps)(Cell)

EntryCell.propTypes = {
  away_index: PropTypes.number.isRequired,
  home_index: PropTypes.number.isRequired,
  current_player_id: PropTypes.string.isRequired,
  game_id: PropTypes.string.isRequired,
}

export default EntryCell
