import React from 'react'

export const FormBanner = ({ 
  backgroundColor,
  backgroundClass,
  children
}) => {
  return (
    <div
      className={`container-fluid pb20 color-block ${backgroundClass}`}
      style={{ backgroundColor }}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 pt20'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
