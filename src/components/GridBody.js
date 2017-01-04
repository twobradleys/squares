import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import EntryCell from '../containers/EntryCell'

// TODO entries is unused here
const GridBody = ({ entries }) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
  {[...Array(10)].map((_, i) => (
    <div key={i} style={{display: 'flex', flexDirection: 'row'}}>
    {[...Array(10)].map((_, j) => (
      <EntryCell key={j} i={i} j={j} />
    ))}
    </div>
  ))}
  </div>
)

GridBody.propTypes = {
  entries: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      PropTypes.object.isRequired
    ).isRequired
  ).isRequired
}

export default GridBody
