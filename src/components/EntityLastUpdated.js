import React, { PropTypes } from 'react'

const EntityLastUpdated = ({ lastUpdated }) => {
  let lastUpdatedText
  if (lastUpdated == null) {
    lastUpdatedText = 'never'
  } else if ((new Date() - lastUpdated) > 10000) {
    lastUpdatedText = lastUpdated.toString()
  } else {
    lastUpdatedText = 'just now'
  }

  return <div>Last Updated: {lastUpdatedText}</div>
}

EntityLastUpdated.propTypes = {
  lastUpdated: PropTypes.instanceOf(Date),
}

export default EntityLastUpdated
