import { connect } from 'react-redux'
import { readyToPlay } from '../selectors'
import App from '../components/App'

const mapStateToProps = (state) => ({
  readyToPlay: readyToPlay(state)
})

const mapDispatchToProps = {}

const Nav = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Nav
