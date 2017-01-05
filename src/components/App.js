import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './App.css'

const MenuItem = ({to, label}) => (
  <li className="pure-menu-item"><Link className="pure-menu-link" to={to}>{label}</Link></li>
)

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

const App = ({ children, readyToPlay }) => (
  <div className="FlexColumn">
    <div className="pure-menu pure-menu-horizontal">
      <ul className="pure-menu-list">
        <MenuItem to="/games" label="Games" />
        <MenuItem to="/players" label="Players" />
        <MenuItem to="/teams" label="Teams" />
        {readyToPlay ? <MenuItem to="/play" label="Play!" /> : null}
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
