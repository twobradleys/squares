import React from 'react'

import GameGrid from '../containers/GameGrid'
import AddPlayer from '../containers/AddPlayer'
import EnrolledPlayerList from '../containers/EnrolledPlayerList'

const App = () => (
  <div>
    <GameGrid />
    <EnrolledPlayerList />
    <AddPlayer />
  </div>
)

export default App
