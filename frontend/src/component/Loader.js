import React, { memo } from 'react'

function Loader() {
  return (
    <div className="popup popup_opened">
      <div className="loader"></div>
    </div>
  )
}

export default memo(Loader)
