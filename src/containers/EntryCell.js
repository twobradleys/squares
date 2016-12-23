import { connect } from 'react-redux'
import { clickGridSquare } from '../actions'
import Cell from '../components/Cell'

const mapStateToProps = (state, ownProps) => {
  const owningPlayerId = state.grid.getIn(['entries', ownProps.i, ownProps.j]);

  if (owningPlayerId !== null) {
    const owningPlayer = state.grid.get('players').find(p => p.get('id') === owningPlayerId)
    return {contents: owningPlayer.get('name')}
  } else {
    return {contents: null}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(clickGridSquare({i: ownProps.i, j: ownProps.j}))
  }
})

const EntryCell = connect(mapStateToProps, mapDispatchToProps)(Cell)

export default EntryCell
