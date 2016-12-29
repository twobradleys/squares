import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Team from './Team'

// TODO dry out with GameList, make an EntityList component?
const TeamList = ({ teamsState, fetchTeams, addTeam }) => (
  <div className='flexRow'>
    <h1>Teams</h1>
    {teamsState.get('teams').size === 0 ? <div><i>No Teams</i></div> : null}
    <div>{teamsState.get('isFetching') ? 'Fetching...' : ''}</div>
    {teamsState.get('teams').map((team,i) => <Team key={i} team={team} />)}
    <br />
    <div>Last Updated: {teamsState.get('lastUpdated') !== null ? teamsState.get('lastUpdated').toString() : 'never'}</div>
    <button onClick={fetchTeams}>Refresh</button>
    <button onClick={() => addTeam(window.prompt("Team name?"))}>Add Team</button>
  </div>
)

TeamList.propTypes = {
  teamsState: ImmutablePropTypes.contains({
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.instanceOf(Date),
    teams: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        id: PropTypes.string,
        name: PropTypes.string.isRequired
      }).isRequired
    )
  }),
  fetchTeams: PropTypes.func.isRequired,
  addTeam: PropTypes.func.isRequired
}

export default TeamList
