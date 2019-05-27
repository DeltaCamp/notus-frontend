import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export const Modal = ReactTimeout(class _Modal extends Component {
  state = { isReady: false }

  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    isSmall: PropTypes.bool,
    isLarge: PropTypes.bool,
    className: PropTypes.string
  }

  componentDidMount () {
    this.props.setTimeout(() => {
      this.setState({
        isReady: true
      })
    })
  }

  render () {
    const {
      children,
      handleClose,
      isOpen,
      isSmall,
      isLarge,
      className
    } = this.props

    const { isReady } = this.state

    return (
      <div
        className={classnames(
          'modal',
          className || '',
          {
            'is-active': isOpen,
            'is-small': isSmall,
            'is-large': isLarge,
            'is-active-enter': isOpen && isReady
          }
        )}
      >
        <div className='modal-background' onClick={handleClose} />
        <div className='modal-content'>
          <div className='modal-content--inner'>
            {children}
          </div>
        </div>
      </div>
    )
  }

})