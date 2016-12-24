import { connect } from 'react-redux'
import { clickGridSquare } from '../actions'
import Cell from '../components/Cell'

const mapStateToProps = (state, ownProps) => {
  const owningPlayerId = state.getIn(['grid', 'entries', ownProps.i, ownProps.j])

  if (owningPlayerId !== null) {
    const owningPlayer = state.getIn(['grid', 'players']).find(p => p.get('id') === owningPlayerId)
    const pickingPlayerId = state.getIn(['grid', 'pickingPlayerId'])
    return {
      contents: owningPlayer.get('name'),
      active: owningPlayerId === pickingPlayerId
    }
  } else {
    return {contents: null, active: false}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(clickGridSquare({i: ownProps.i, j: ownProps.j}))
  }
})

const EntryCell = connect(mapStateToProps, mapDispatchToProps)(Cell)

export default EntryCell
