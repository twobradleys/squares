import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './App.css'

const App = ({ children }) => (
  <div className="FlexColumn">
    <div className="FlexRow" style={{justifyContent: 'space-around'}}>
      <div><Link to="/teams">Teams</Link></div>
      <div><Link to="/games">Games</Link></div>
      <div><Link to="/play">Play!</Link></div>
    </div>
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
