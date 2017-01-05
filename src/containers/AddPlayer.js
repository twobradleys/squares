import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addPlayer } from '../actions'

let AddPlayer = ({ locked, addPlayer }) => {
  if (locked) {
    return null
  } else {
    return (
      <div>
        <button className='pure-button' onClick={() => addPlayer(window.prompt("Player Initials?"))}>Add Player</button>
      </div>
    )
  }
}

AddPlayer.propTypes = {
  locked: PropTypes.bool.isRequired,
  addPlayer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  locked: state.getIn(['grid', 'locked'])
})

const mapDispatchToProps = ({
  addPlayer: addPlayer
})

AddPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlayer)

export default AddPlayer
