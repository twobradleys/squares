import React from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../actions';

let AddPlayer = ({ dispatch }) => (
  <div>
  <a href onClick={e => {
    e.preventDefault();
    dispatch(addPlayer(window.prompt("Player Initials?")));
  }}>Add Player</a>
  </div>
);

AddPlayer = connect()(AddPlayer);

export default AddPlayer;
