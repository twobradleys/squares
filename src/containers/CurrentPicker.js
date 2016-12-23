import { connect } from 'react-redux'
import { makeQuickPicks } from '../actions'
import QuickPicker from '../components/QuickPicker'

const mapStateToProps = (state) => {
  const pickingPlayerId = state.getIn(['grid', 'pickingPlayerId'])
  if (pickingPlayerId == null) {
    return {isActive: false}
  } else {
    const pickingPlayer = state.getIn(['grid', 'players']).find(p => p.get('id') === pickingPlayerId)
    return {isActive: true, name: pickingPlayer.get('name')}
  }
}

const mapDispatchToProps = ({
  onQuickPick: makeQuickPicks
})

const CurrentPicker = connect(mapStateToProps, mapDispatchToProps)(QuickPicker)

// TODO better name
export default CurrentPicker
