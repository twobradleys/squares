import { connect } from 'react-redux'
import { fetchTeams, addTeam } from '../actions'
import TeamList from '../components/TeamList'

const mapStateToProps = (state) => ({
  teamsState: state.get('teams')
})

const mapDispatchToProps = {
  fetchTeams: fetchTeams,
  addTeam: addTeam
}

const ServerTeamList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamList)

export default ServerTeamList
