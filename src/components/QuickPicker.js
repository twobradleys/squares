import React, { PropTypes } from 'react';

const QuickPicker = ({ isActive, name, onQuickPick }) => {
  if (isActive) {
    return (
      <div>
        <p>{name} is currently picking. Click anywhere to claim a square.</p>
        <p>Or auto pick: <button onClick={() => onQuickPick(1)}>1 square</button> | <button onClick={() => onQuickPick(5)}>5 squares</button> | <button onClick={() => onQuickPick(10)}>10 squares</button></p>
      </div>
    )
  } else {
    return null;
  }
}

QuickPicker.propTypes = {
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onQuickPick: PropTypes.func,
};


export default QuickPicker
