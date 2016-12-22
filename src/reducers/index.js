import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import players from './players';

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  players
});

export default todoApp;
