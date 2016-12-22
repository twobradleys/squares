import React, { PropTypes } from 'react';

const Player = ({ id, name }) => (
    <span>{name}</span>
);

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default Player;
