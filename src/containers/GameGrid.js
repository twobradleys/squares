import { connect } from 'react-redux'
import Grid from '../components/Grid'

const mapStateToProps = (state) => ({
 grid: state.grid
})

const mapDispatchToProps = ({
})

const GameGrid = connect(mapStateToProps, mapDispatchToProps)(Grid)

export default GameGrid
