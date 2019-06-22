import React from 'react'

import NotusSectionTriangle from '~/assets/images/notus-section-triangle.svg'

export const SlantSVG = ({ position, fill }) => {
  let positionClass = position || 'top'

  return (
    <svg
      className={`${positionClass}-svg`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
    >
      <NotusSectionTriangle className={`has-fill-${fill}`} />
    </svg>
  )
}
