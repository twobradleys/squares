import React, { PropTypes } from 'react'
import Cell from './Cell'

const Digits = ({ team }) => (
  <div style={{display: 'flex', flexDirection: team === 'home' ? 'row' : 'column'}}>
    {[...Array(10)].map((x, i) => (
       <Cell key={i} contents='?' />
     ))}
  </div>
)

Digits.propTypes = {
  team: PropTypes.string.isRequired
}

export default Digits
