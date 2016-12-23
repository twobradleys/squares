import React, { PropTypes } from 'react';
import Player from './Player';

const PlayerList = ({ players, pickingPlayer, onPlayerClick }) => (
  <div className='PlayerList'>
    <h1>Players</h1>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      {players.map(player =>
        <Player
            key={player.id}
            {...player}
            picking={pickingPlayer === player.id}
            onClick={() => onPlayerClick(player.id)}
         />
      )}
    </div>
  </div>
);

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  pickingPlayer: PropTypes.number,
  onPlayerClick: PropTypes.func.isRequired
};

export default PlayerList;
