import React from 'react'

export const FormFooter = ({
  children
}) => {
  return (
    <div className={`is-white-ter pt30 pb30`}>
      <div className={`container-fluid`}>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 has-text-centered is-size-4'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
