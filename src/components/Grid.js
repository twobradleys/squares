import React from 'react'

import Cell from './Cell'
import TeamDigits from '../containers/TeamDigits'
import EntryCell from '../containers/EntryCell'

const Grid = () => (
  <div className="FlexColumn">
    <div className="FlexRow">
      <Cell active={false} />
      <TeamDigits team="home" />
    </div>
    <div className="FlexRow">
      <TeamDigits team="away" />
      <div className="FlexColumn">
        {[...Array(10)].map((_, i) => (
           <div key={i} className="FlexRow">
             {[...Array(10)].map((_, j) => (
                <EntryCell key={j} i={i} j={j} />
              ))}
           </div>
         ))}
      </div>
    </div>
  </div>
)

export default Grid
