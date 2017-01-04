import { connect } from 'react-redux'
import { fetchEntities, joinGame } from '../actions'
import GameList from '../components/GameList'

const entityType = 'games'

const mapStateToProps = (state) => ({
  gamesState: state.getIn(['entities', entityType])
})

const mapDispatchToProps = {
  fetchGames: () => fetchEntities({entityType}),
  joinGame: joinGame,
}

const ServerGameList = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameList)

export default ServerGameList
