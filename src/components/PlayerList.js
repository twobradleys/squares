import React, { PropTypes } from 'react';
import Player from './Player';

const PlayerList = ({ players }) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    {players.map(player =>
      <div key={player.id}>
        <Player {...player} />
      </div>
     )}
  </div>
);

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default PlayerList;
