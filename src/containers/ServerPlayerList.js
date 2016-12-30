import { connect } from 'react-redux'
import { fetchPlayers, createPlayer } from '../actions'
import PlayerList from '../components/PlayerList'

const mapStateToProps = (state) => ({
  playersState: state.get('players')
})

const mapDispatchToProps = { fetchPlayers, createPlayer }

const ServerPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList)

export default ServerPlayerList
