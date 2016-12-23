import React, { PropTypes } from 'react';

const Player = ({ id, name, picking }) => (
  <div className={'Player ' + (picking ? 'Picking' : '')}>{name}</div>
);

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picking: PropTypes.bool.isRequired
};

export default Player;
