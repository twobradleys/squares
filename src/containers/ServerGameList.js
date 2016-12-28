import { connect } from 'react-redux'
import { fetchGames } from '../actions'
import GameList from '../components/GameList'

const mapStateToProps = (state) => ({
  gamesState: state.get('games')
})

const mapDispatchToProps = {
  fetchGames: fetchGames
}

const ServerGameList = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameList)

export default ServerGameList
