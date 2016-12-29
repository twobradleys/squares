import 'babel-polyfill' // This is our Promise implementation

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createLogger from 'redux-logger'
import { Iterable } from 'immutable'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import Root from './components/Root'
import rootSaga from './sagas'

const loggerMiddleware = createLogger({
  // Render Immutable.js more nicely in console logs
  stateTransformer: (state) => Iterable.isIterable(state) ? state.toJS() : state
})

//const sagaMiddleware = createSagaMiddleware({sagaMonitor}) TODO
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(
      loggerMiddleware,
      sagaMiddleware // TODO does order of these matter?
    )
  )
)

sagaMiddleware.run(rootSaga)

render(
  <Root store={store} />,
  document.getElementById('root')
)
