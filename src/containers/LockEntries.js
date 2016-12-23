import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { allSquaresClaimed } from '../selectors'
import { lockEntries } from '../actions'

let LockEntries = ({ allSquaresClaimed, locked, lockEntries }) => {
  if (allSquaresClaimed && !locked) {
    return (
      <div>
        <p>All squares have been picked</p>
        <button onClick={lockEntries}>Start the Game!</button>
      </div>
      )
  } else {
    return null
  }
}

LockEntries.propTypes = {
  allSquaresClaimed: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  lockEntries: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  allSquaresClaimed: allSquaresClaimed(state),
  locked: state.getIn(['grid', 'locked'])
});

const mapDispatchToProps = ({
  lockEntries: lockEntries
});

LockEntries = connect(
  mapStateToProps,
  mapDispatchToProps
)(LockEntries)

export default LockEntries
