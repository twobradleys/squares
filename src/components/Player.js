import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

const Player = ({ player, signIn }) => (
  <div className='FlexRow' style={{justifyContent: 'space-between'}}>
    <div>{player.get('handle')}</div>
    <div>{player.get('handle') !== 'house' ? <button className='pure-button' onClick={() => signIn(player)}>Sign In</button> : null}</div>
    <div><pre style={{fontSize: 10, margin: 0}}>{player.get('id') || '(pending)'}</pre></div>
  </div>
)

Player.propTypes = {
  player: ImmutablePropTypes.contains({
    id: PropTypes.string,
    handle: PropTypes.string.isRequired,
  }).isRequired,
  signIn: PropTypes.func.isRequired,
}

export default Player
