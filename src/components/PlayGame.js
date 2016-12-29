import React from 'react'

import Grid from './Grid'
import GameInfo from './GameInfo'
import CurrentPicker from '../containers/CurrentPicker'
import EnrolledPlayerList from '../containers/EnrolledPlayerList'
import AddPlayer from '../containers/AddPlayer'
import LockEntries from '../containers/LockEntries'

const PlayGame = () => (
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

export default PlayGame
