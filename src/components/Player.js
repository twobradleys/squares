import React, { PropTypes } from 'react'
import Cell from './Cell'

const Player = ({ id, name, picking, onClick }) => (
  <Cell active={picking} onClick={onClick} contents={name}></Cell>
)

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picking: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Player
