import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

import players from './players';
import pickingPlayer from './pickingPlayer';

const todoApp = combineReducers({
  todos,
  visibilityFilter,

  players,
  pickingPlayer
});

export default todoApp;
