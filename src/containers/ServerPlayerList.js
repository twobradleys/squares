import { connect } from 'react-redux'
import { fetchEntities, createEntity } from '../actions'
import PlayerList from '../components/PlayerList'

const entityType = 'players'

const mapStateToProps = (state) => ({
  // TODO wrap this in a selector, break into multiple fields
  playersState: state.getIn(['entities', 'players']),
})

const mapDispatchToProps = {
  fetchPlayers: () => fetchEntities({entityType}),
  createPlayer: (newEntity) => createEntity({entityType, newEntity}),
}

const ServerPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList)

export default ServerPlayerList
