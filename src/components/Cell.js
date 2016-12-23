import React, { PropTypes } from 'react';

const Cell = ({ contents, onClick }) => (
  <div onClick={onClick} style={{width: '25px', height: '25px', border: '1px solid black'}}>{contents}</div>
)

Cell.propTypes = {
  contents: PropTypes.number,
  onClick: PropTypes.func
}

export default Cell
