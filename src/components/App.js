import React from 'react'

import Grid from '../components/Grid'
import AddPlayer from '../containers/AddPlayer'
import EnrolledPlayerList from '../containers/EnrolledPlayerList'

const App = () => (
  <div>
    <Grid />
    <EnrolledPlayerList />
    <AddPlayer />
  </div>
)

export default App
