const pickingPlayer = (state = null, action) => {
  switch (action.type) {
  case 'ADD_PLAYER':
    return action.id;
  case 'SELECT_PLAYER':
    return action.id;
  default:
    return state;
  }
};

export default pickingPlayer;
