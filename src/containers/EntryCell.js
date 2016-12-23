import { connect } from 'react-redux'
import { clickGridSquare } from '../actions'
import Cell from '../components/Cell'

const mapStateToProps = (state, ownProps) => ({
  contents: state.grid.getIn(['entries', ownProps.i, ownProps.j])
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(clickGridSquare({i: ownProps.i, j: ownProps.j}))
  }
})

const EntryCell = connect(mapStateToProps, mapDispatchToProps)(Cell)

export default EntryCell
