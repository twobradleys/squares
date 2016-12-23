import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Cell from './Cell'
import TeamDigits from '../containers/TeamDigits'
import GridBody from './GridBody'

const Grid = ({ entries }) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Cell />
      <TeamDigits team="home" />
    </div>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <TeamDigits team="away" />
      <GridBody entries={entries} />
    </div>
  </div>
)

Grid.propTypes = {
  // TODO push this down to a GridBody container
  entries: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      PropTypes.number
    ).isRequired
  ).isRequired
}

export default Grid
