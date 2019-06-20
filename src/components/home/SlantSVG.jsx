import React from 'react'

import NotusSectionTriangle from '~/assets/images/notus-section-triangle.svg'

export const SlantSVG = ({ position, fill }) => {
  let style = {}
  let positionClass = position || 'top'
  
  if (fill) {
    style = { fill }
  }

  return (
    <svg
      className={`${positionClass}-svg`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
    >
      <NotusSectionTriangle className={`has-fill-${fill}`} />
      {/* <polygon
        points='0,100 100,0 100,100'
        className={polygonClass}
        style={style}
      /> */}
    </svg>
  )
}

// points = '0,100 100,0 100,100'
