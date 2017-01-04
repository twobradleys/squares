import React, { PropTypes } from 'react'

import Cell from './Cell'
import TeamDigits from '../containers/TeamDigits'
import EntryCell from '../containers/EntryCell'

const Grid = ({current_player_id, game_id}) => (
  <div className="FlexColumn">
    <div className="FlexRow">
      <Cell active={false} />
      <TeamDigits team="home" />
    </div>
    <div className="FlexRow">
      <TeamDigits team="away" />
      <div className="FlexColumn">
        {[...Array(10)].map((_, away_index) => (
           <div key={away_index} className="FlexRow">
             {[...Array(10)].map((_, home_index) => (
               <EntryCell key={home_index} away_index={away_index} home_index={home_index} current_player_id={current_player_id} game_id={game_id} />
              ))}
           </div>
         ))}
      </div>
    </div>
  </div>
)

Grid.propTypes = {
  current_player_id: PropTypes.string.isRequired,
  game_id: PropTypes.string.isRequired,
}

export default Grid
