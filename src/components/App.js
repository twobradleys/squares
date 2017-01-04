import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './App.css'

const App = ({ children, readyToPlay }) => (
  <div className="FlexColumn">
    <div className="FlexRow" style={{justifyContent: 'space-around'}}>
      <div><Link to="/games">Games</Link></div>
      <div><Link to="/players">Players</Link></div>
      <div><Link to="/teams">Teams</Link></div>
      {readyToPlay ? <div><Link to="/play">Play!</Link></div> : null}
    </div>
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.object.isRequired,
  readyToPlay: PropTypes.bool.isRequired
}

export default App
