import { connect } from 'react-redux'
import Digits from '../components/Digits'

const mapStateToProps = (state, ownProps) => ({
  digits: state.getIn(['grid', 'digits', ownProps.team])
})

const mapDispatchToProps = ({
})

const TeamDigits = connect(mapStateToProps, mapDispatchToProps)(Digits)

export default TeamDigits
