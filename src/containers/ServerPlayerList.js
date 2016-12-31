import { connect } from 'react-redux'
import { fetchEntities, createEntity } from '../actions'
import PlayerList from '../components/PlayerList'

const entityType = 'players'

const mapStateToProps = (state) => ({
  // TODO break into multiple fields
  playersState: state.getIn(['entities', entityType]),
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
