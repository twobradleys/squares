import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Cell from './Cell'

const Digits = ({ team, digits }) => (
  <div style={{display: 'flex', flexDirection: team === 'home' ? 'row' : 'column'}}>
    {digits.map((digit, index) => (
       <Cell key={index} contents={(digit !== null) ? digit.toString() : '?'} />
     ))}
  </div>
)

Digits.propTypes = {
  team: PropTypes.string.isRequired,
  digits: ImmutablePropTypes.listOf(PropTypes.number).isRequired
}

export default Digits
