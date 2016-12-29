import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Team = ({ team }) => (
  <div className='flexColumn'>
    <div>{team.get('name')}</div>
    <div><pre>{team.get('id')}</pre></div>
  </div>
)

// TODO reuse proptypes?
Team.propTypes = {
  team: ImmutablePropTypes.contains({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default Team