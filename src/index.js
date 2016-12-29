import 'babel-polyfill' // This is our Promise implementation

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import createLogger from 'redux-logger'
import { Iterable } from 'immutable'
import reducer from './reducers'
import Root from './components/Root'


const loggerMiddleware = createLogger({
  // Render Immutable.js more nicely in console logs
  stateTransformer: (state) => Iterable.isIterable(state) ? state.toJS() : state
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
)

render(
  <Root store={store} />,
  document.getElementById('root')
)
