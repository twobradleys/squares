import { connect } from 'react-redux';
import { selectPlayer } from '../actions';
import PlayerList from '../components/PlayerList';

const mapStateToProps = (state) => ({
  pickingPlayer: state.pickingPlayer,
  players: state.players
});

const mapDispatchToProps = ({
  onPlayerClick: selectPlayer
});

const EnrolledPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList);

export default EnrolledPlayerList;
