import React from 'react'

import NotusSectionTriangle from '~/assets/images/notus-section-triangle.svg'

export const SlantSVG = ({ position, polygonClass, fill }) => {
  let style = {}
  let positionClass = 'top-svg'

  if (position === 'bottom') {
    positionClass = 'bottom-svg'
  }
  
  if (fill) {
    style = { fill }
  }

  return (
    <svg
      className={positionClass}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
    >
      <NotusSectionTriangle style={style} />
      {/* <polygon
        points='0,100 100,0 100,100'
        className={polygonClass}
        style={style}
      /> */}
    </svg>
  )
}

// points = '0,100 100,0 100,100'
