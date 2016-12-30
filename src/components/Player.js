import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Player = ({ player }) => (
  <div className='FlexRow' style={{justifyContent: 'space-between'}}>
    <div>{player.get('handle')}</div>
    <div><pre style={{fontSize: 10, margin: 0}}>{player.get('id') || '(pending)'}</pre></div>
  </div>
)

Player.propTypes = {
  player: ImmutablePropTypes.contains({
    id: PropTypes.string,
    handle: PropTypes.string.isRequired,
  }).isRequired
}

export default Player
