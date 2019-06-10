import React from 'react'
import classnames from 'classnames'

export const ColorBlock = ({
  backgroundColor,
  children,
  brightnessPercent,
  hasMinHeight,
  isDark,
  columnSizing
}) => {
  return (
    <div
      style={{ backgroundColor }}
      className={classnames(
        'form-box',
        'color-block',
        {
          'has-min-height': hasMinHeight,
          'is-dark-colored': isDark
        }
      )}
    >
      <div className={`is-brightness-${brightnessPercent} is-full-width-background`} />

      <div className='container'>
        <div className='row'>
          <div className={columnSizing}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
