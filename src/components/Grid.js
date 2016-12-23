import React from 'react';

import Cell from './Cell'
import Digits from './Digits'
import GridBody from './GridBody'

const Grid = () => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Cell />
      <Digits team="home" />
    </div>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Digits team="away" />
      <GridBody />
    </div>
  </div>
)

export default Grid
