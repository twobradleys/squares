import { connect } from 'react-redux'
import Digits from '../components/Digits'

import Immutable from 'immutable'

const mapStateToProps = (state, ownProps) => ({
  //  digits: state.getIn(['grid', 'digits', ownProps.team])
  // TODO
  digits: Immutable.List([0,1,2,3,4,5,6,7,8,9])
})

const mapDispatchToProps = ({
})

const TeamDigits = connect(mapStateToProps, mapDispatchToProps)(Digits)

export default TeamDigits
