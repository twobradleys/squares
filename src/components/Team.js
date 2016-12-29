import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Team = ({ team }) => (
  <div className='FlexRow' style={{justifyContent: 'space-between'}}>
    <div>{team.get('name')}</div>
    <div><pre style={{fontSize: 10, margin: 0}}>{team.get('id') || '(pending)'}</pre></div>
  </div>
)

// TODO reuse proptypes?
Team.propTypes = {
  team: ImmutablePropTypes.contains({
    id: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default Team
