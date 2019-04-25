import React from 'react'

export const SlantSVG = ({ position, polygonClass }) => {
  let positionClass = 'top-svg'

  if (position === 'bottom') {
    positionClass = 'bottom-svg'
  }

  return (
    <svg
      className={positionClass}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
    >
      <polygon
        points='0,100 100,0 100,100'
        className={polygonClass}
      />
    </svg>
  )
}

// points = '0,100 100,0 100,100'