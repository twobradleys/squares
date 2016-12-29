import { connect } from 'react-redux'
import { fetchTeams, createTeam } from '../actions'
import TeamList from '../components/TeamList'

const mapStateToProps = (state) => ({
  teamsState: state.get('teams')
})

const mapDispatchToProps = { fetchTeams, createTeam }

const ServerTeamList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamList)

export default ServerTeamList
