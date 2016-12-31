import { connect } from 'react-redux'
import { fetchEntities, createEntity } from '../actions'
import TeamList from '../components/TeamList'

const entityType = 'teams'

const mapStateToProps = (state) => ({
  teamsState: state.getIn(['entities', entityType]),
})

const mapDispatchToProps = {
  fetchTeams: () => fetchEntities({entityType}),
  createTeam: (newEntity) => createEntity({entityType, newEntity}),
}

const ServerTeamList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamList)

export default ServerTeamList
