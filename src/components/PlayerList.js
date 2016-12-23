import React, { PropTypes } from 'react';
import Player from './Player';

const PlayerList = ({ pickingPlayer, players }) => (
  <div className='PlayerList'>
    <h1>Players</h1>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      {players.map(player =>
        <Player key={player.id} picking={pickingPlayer === player.id} {...player} />
      )}
    </div>
  </div>
);

PlayerList.propTypes = {
  pickingPlayer: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default PlayerList;
