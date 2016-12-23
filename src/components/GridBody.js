import React from 'react'
import Cell from './Cell'

const GridBody = () => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
  {[...Array(10)].map((x, i) => (
    <div key={i} style={{display: 'flex', flexDirection: 'row'}}>
    {[...Array(10)].map((y, j) => (
      <Cell key={j} />
    ))}
    </div>
  ))}
  </div>
)

export default GridBody
