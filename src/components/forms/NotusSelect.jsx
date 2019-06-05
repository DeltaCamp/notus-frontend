import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Select from 'react-select'

import { KEYS } from '~/constants'
import { getSystemInfo } from '~/utils/getSystemInfo'

const selectStyles = {
  control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
}

const Menu = props => {
  const shadow = 'hsla(218, 50%, 10%, 0.1)'

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 5,
        position: 'absolute',
        zIndex: 2,
      }}
      {...props}
    />
  )
}

const Blanket = props => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: 'fixed',
      zIndex: 1,
    }}
    {...props}
  />
)

const Dropdown = ({ handleKeyUp, children, isOpen, target, onClose, className }) => (
  <span className={`react-select__dropdown ${className || ''}`}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </span>
)

const Svg = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...props}
  />
)

const DropdownIndicator = () => (
  <div style={{ color: '#aaa', height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
)

const ChevronDown = () => (
  <Svg className='react-select__chevron'>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
)

export const NotusSelect = class _NotusSelect extends Component {
  state = { isOpen: false }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    handleOpenReactSelect: PropTypes.func,
    handleCloseReactSelect: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.object,
    isOpen: PropTypes.bool
  }
    
  componentDidMount () {
    const { mobileOS } = getSystemInfo()
    const touch = (mobileOS === 'iOS' || mobileOS === 'Android')

    this.setState({ autoFocus: !touch })

    if (this.props.isOpen) {
      this.setState({ isOpen: true })
    }
  }

  runCallbacks = () => {
    if (this.state.isOpen) {
      if (this.props.handleOpenReactSelect) {
        this.props.handleOpenReactSelect()
      }

      document.addEventListener("keydown", this.handleKeyDown);
    } else {
      if (this.props.handleCloseReactSelect) {
        this.props.handleCloseReactSelect()
      }

      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }

  componentDidUpdate (oldProps) {
    if (!oldProps.isOpen && this.props.isOpen && !this.state.isOpen) {
      this.setState({ isOpen: true })
    }
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    }, this.runCallbacks)
  }

  onSelectChange = value => {
    this.toggleOpen()
    this.props.onChange(value)
  }

  handleKeyDown = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.toggleOpen()
    }
  }

  onClick = (e) => {
    e.stopPropagation()
  }

  render () {
    const { isOpen } = this.state

    return (
      <Dropdown
        handleKeyUp={this.handleKeyUp}
        isOpen={isOpen}
        onClose={this.toggleOpen}
        className={this.props.className || ''}
        target={
          <button
          onClick={this.toggleOpen}
          className={classnames(
            'event-box__variable',
            'has-react-select',
            {
              'is-active': isOpen
              }
              )}
              >
            {this.props.value ? this.props.value.label : '...'} <ChevronDown />
          </button>
        }
      >
        <Select
          {...this.props}
          autoFocus={this.state.autoFocus}
          backspaceRemovesValue={false}
          components={{ DropdownIndicator, IndicatorSeparator: null }}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          isClearable={false}
          menuIsOpen
          onChange={this.onSelectChange}
          onClick={this.onClick}
          placeholder="Search..."
          styles={selectStyles}
          tabSelectsValue={false}
          onKeyUp={this.handleKeyUp}
          className='react-select'
          classNamePrefix='react-select'
        />
      </Dropdown>
    )
  }
}
