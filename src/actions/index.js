let nextTodoId = 0;

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});


let nextPlayerId = 0;

export const addPlayer = (name) => ({
  type: 'ADD_PLAYER',
  id: nextPlayerId++,
  name
});

export const selectPlayer = (id) => ({
  type: 'SELECT_PLAYER',
  id
});