import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Cell from './Cell'
import Digits from './Digits'
import GridBody from './GridBody'

const Grid = ({ grid }) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Cell />
      <Digits team="home" />
    </div>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Digits team="away" />
      <GridBody grid={grid} />
    </div>
  </div>
)

Grid.propTypes = {
  // TODO push this down to a GridBody container
  grid: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      PropTypes.number
    ).isRequired
  ).isRequired
}

export default Grid
