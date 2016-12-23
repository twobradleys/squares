import React, { PropTypes } from 'react';

const Player = ({ id, name, picking, onClick }) => (
  <div className={'Player ' + (picking ? 'Picking' : '')} onClick={onClick}>{name}</div>
);

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picking: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Player;
