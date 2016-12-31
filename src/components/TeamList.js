import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Team from './Team'

// TODO dry out with GameList, make an EntityList component?
const TeamList = ({ teamsState, fetchTeams, createTeam }) => (
  <div className='FlexColumn'>
    {teamsState.get('items').size === 0 ? <div><i>No Teams</i></div> : null}
    {teamsState.get('items').map((team,i) => <Team key={i} team={team} />)}
    <br />
    {/* TODO only show fetching... if it has been up for 200ms+ (to avoid flashing) */}
    <div>{teamsState.get('isFetching') ? 'Fetching...' : ''}</div>
    <div>Last Updated: {teamsState.get('lastUpdated') !== null ? teamsState.get('lastUpdated').toString() : 'never'}</div>
    <button onClick={fetchTeams}>Refresh</button>
    <button onClick={() => createTeam({name: window.prompt("Team name?")})}>Add Team</button>
  </div>
)

TeamList.propTypes = {
  teamsState: ImmutablePropTypes.contains({
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.instanceOf(Date),
    teams: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        id: PropTypes.string,
        name: PropTypes.string.isRequired
      }).isRequired
    )
  }),
  fetchTeams: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired
}

export default TeamList
