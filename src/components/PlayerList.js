import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Player from './Player';

const PlayerList = ({ players, pickingPlayerId, onPlayerClick }) => (
  <div className='PlayerList'>
    <h1>Players</h1>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      {players.map(player =>
        <Player
          key={player.get('id')}
          id={player.get('id')}
          name={player.get('name')}
          picking={pickingPlayerId === player.get('id')}
          onClick={() => onPlayerClick(player.get('id'))}
         />
      )}
    </div>
  </div>
);

PlayerList.propTypes = {
  players: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  pickingPlayerId: PropTypes.number,
  onPlayerClick: PropTypes.func.isRequired
};

export default PlayerList;
