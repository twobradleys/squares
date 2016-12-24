import React from 'react'

import Cell from './Cell'
import TeamDigits from '../containers/TeamDigits'
import GameGrid from '../containers/GameGrid'

const Grid = () => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Cell active={false} />
      <TeamDigits team="home" />
    </div>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <TeamDigits team="away" />
      <GameGrid />
    </div>
  </div>
)

export default Grid
