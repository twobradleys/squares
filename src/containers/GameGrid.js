import { connect } from 'react-redux'
import GridBody from '../components/GridBody'
import { getCellsInGrid } from '../selectors'

const mapStateToProps = (state) => ({
 entries: getCellsInGrid(state)
})

const mapDispatchToProps = ({
})

const GameGrid = connect(mapStateToProps, mapDispatchToProps)(GridBody)

export default GameGrid
