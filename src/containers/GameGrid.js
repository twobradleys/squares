import { connect } from 'react-redux'
import Grid from '../components/Grid'

const mapStateToProps = (state) => ({
 entries: state.getIn(['grid', 'entries'])
})

const mapDispatchToProps = ({
})

const GameGrid = connect(mapStateToProps, mapDispatchToProps)(Grid)

export default GameGrid
