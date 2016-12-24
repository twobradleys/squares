import React, { PropTypes } from 'react'

const Cell = ({ active, contents, onClick }) => (
  <div className={'Cell ' + (active ? 'Active' : '')} onClick={onClick}>{contents}</div>
)

Cell.propTypes = {
  active: PropTypes.bool.isRequired,
  contents: PropTypes.string,
  onClick: PropTypes.func
}

export default Cell
