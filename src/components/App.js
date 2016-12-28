import React from 'react'

import './App.css'

/*
import Grid from './Grid'
import GameInfo from './GameInfo'
import CurrentPicker from '../containers/CurrentPicker'
import EnrolledPlayerList from '../containers/EnrolledPlayerList'
import AddPlayer from '../containers/AddPlayer'
import LockEntries from '../containers/LockEntries'



const App = () => (
  <div className="FlexColumn">
    <div className="FlexRow">
      <Grid />
      <GameInfo />
    </div>
    <EnrolledPlayerList />
    <AddPlayer />
    <CurrentPicker />
    <LockEntries />
  </div>
)
*/

import GameList from './GameList'

import Immutable from 'immutable'
const GAMES = Immutable.List([Immutable.Map({eventName: 'foo'}), Immutable.Map({eventName: 'bar'})])

const App = () => (
  <GameList games={GAMES} />
)

export default App
