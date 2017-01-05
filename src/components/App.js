import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './App.css'

const App = ({ children, readyToPlay }) => (
  <div className="FlexColumn">
    <div className="pure-menu pure-menu-horizontal">
      <ul className="pure-menu-list">
        <li className="pure-menu-item"><Link className="pure-menu-link" to="/games">Games</Link></li>
        <li className="pure-menu-item"><Link className="pure-menu-link" to="/players">Players</Link></li>
        <li className="pure-menu-item"><Link className="pure-menu-link" to="/teams">Teams</Link></li>
        {readyToPlay ? <li><Link to="/play">Play!</Link></li> : null}
      </ul>
    </div>
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.object.isRequired,
  readyToPlay: PropTypes.bool.isRequired
}

export default App
