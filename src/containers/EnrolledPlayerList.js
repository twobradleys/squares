import { connect } from 'react-redux';
import { selectPlayer } from '../actions';
import PlayerList from '../components/PlayerList';

const mapStateToProps = (state) => ({
  pickingPlayerId: state.grid.get('pickingPlayerId'),
  players: state.grid.get('players')
});

const mapDispatchToProps = ({
  onPlayerClick: selectPlayer
});

const EnrolledPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList);

export default EnrolledPlayerList;
