import React from 'react'

import Grid from '../components/Grid'
import CurrentPicker from '../containers/CurrentPicker'
import EnrolledPlayerList from '../containers/EnrolledPlayerList'
import AddPlayer from '../containers/AddPlayer'
import LockEntries from '../containers/LockEntries'

import './App.css'

const App = () => (
  <div>
    <Grid />
    <EnrolledPlayerList />
    <AddPlayer />
    <CurrentPicker />
    <LockEntries />
  </div>
)

export default App
