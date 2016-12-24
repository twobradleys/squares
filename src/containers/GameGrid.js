import { connect } from 'react-redux'
import GridBody from '../components/GridBody'

const mapStateToProps = (state) => ({
 entries: state.getIn(['grid', 'entries'])
})

const mapDispatchToProps = ({
})

const GameGrid = connect(mapStateToProps, mapDispatchToProps)(GridBody)

export default GameGrid
