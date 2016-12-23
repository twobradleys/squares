import React from 'react'

import GameGrid from '../containers/GameGrid'
import CurrentPicker from '../containers/CurrentPicker'
import EnrolledPlayerList from '../containers/EnrolledPlayerList'
import AddPlayer from '../containers/AddPlayer'


const App = () => (
  <div>
    <GameGrid />
    <EnrolledPlayerList />
    <AddPlayer />
    <CurrentPicker />
  </div>
)

export default App
