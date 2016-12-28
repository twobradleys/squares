import { connect } from 'react-redux'
import { selectPlayer } from '../actions'
import PlayerList from '../components/PlayerList'

const mapStateToProps = (state) => ({
  pickingPlayerId: state.getIn(['grid', 'pickingPlayerId']),
  players: state.getIn(['grid', 'players'])
})

const mapDispatchToProps = ({
  onPlayerClick: selectPlayer
})

const EnrolledPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList)

export default EnrolledPlayerList
