import React from 'react'
import Select from 'react-select'

export const NotusSelect = 
  (props) => {
    return <Select
      {...props}
      menuPlacement='auto'
      className={`react-select ${props.className || ''}`}
      classNamePrefix='react-select'
      autoFocus
    />
      
  }
