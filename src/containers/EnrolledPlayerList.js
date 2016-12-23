import { connect } from 'react-redux';
import PlayerList from '../components/PlayerList';

const mapStateToProps = (state) => ({
  pickingPlayer: state.pickingPlayer,
  players: state.players
});

const mapDispatchToProps = {};

const EnrolledPlayerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList);

export default EnrolledPlayerList;
