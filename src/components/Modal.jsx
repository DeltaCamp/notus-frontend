import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export const Modal = ({ children, handleClose, isOpen, className }) => {
  return (
    <div className={classnames('modal', className || '', { 'is-active': isOpen })}>
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-content">
        <div className="modal-content--inner">
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}