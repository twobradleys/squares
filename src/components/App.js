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


import ServerGameList from '../containers/ServerGameList'

const App = () => (
  <ServerGameList />
)

*/


/*
    <div className="FlexColumn">
    <div><Link to="/play">Play</Link></div>
    </div>
  */

import { Link } from 'react-router'

const App = ({ children }) => (
  <div className="FlexColumn">
    <div className="FlexRow" style={{justifyContent: 'space-around'}}>
      <div><Link to="/teams">Teams</Link></div>
      <div><Link to="/games">Games</Link></div>
    </div>
    {children}
  </div>
)


export default App
