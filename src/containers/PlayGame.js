import { connect } from 'react-redux'
import { getCurrentGame } from '../selectors'
import { fetchCellsForGame } from '../actions'
import GameBoard from '../components/GameBoard'

const mapStateToProps = (state) => ({
  game: getCurrentGame(state)
})

const mapDispatchToProps = ({ fetchCellsForGame })

const PlayGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard)

export default PlayGame
