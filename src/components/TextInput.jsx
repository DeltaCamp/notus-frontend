import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'

import { KEYS } from '~/constants'

export const TextInput = ReactTimeout(class _TextInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleStartEditing: PropTypes.func,
    required: PropTypes.bool
  }

  static defaultProps = {
    required: true
  }

  state = {
    value: this.props.value,
    previousValue: this.props.value
  }

  componentDidUpdate = () => {
    this.props.setTimeout(ReactTooltip.rebuild)
  }

  handleCancel = () => {
    this.setState({
      value: this.state.previousValue
    })
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  setNewPreviousValue = () => {
    this.setState({
      previousValue: this.state.value
    })
  } 

  handleBlur = (e) => {
    e.preventDefault()

    if (this.state.value !== this.state.previousValue) {
      this.setNewPreviousValue()
      this.props.handleSubmit(this.state.value)
    }
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.handleCancel()
    } else if (e.keyCode === KEYS.enter) {
      this.refs.inputRef.blur()
    }
  }

  handleClick = () => {
    if (this.props.handleStartEditing) {
      this.props.handleStartEditing()
    }
  }

  valid = () => {
    return this.state.value && this.state.value.length > 0
  }

  render () {
    const props = {}

    if (this.props.required) {
      props['data-tip'] = !this.valid() ? 'Please enter a value' : this.state.value
    }

    return (
      <input
        {...props}
        type='text'
        className={classnames(
          'input',
          'is-truncated',
          {
            'has-border-danger': this.state.value.length && !this.valid()
          }
        )}
        ref='inputRef'
        placeholder='Enter hex data'
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeyUp}
        onClick={this.handleClick}
        style={{
          minWidth: 230,
          width: ((this.state.value.length + 1) * 16)
        }}
      />
    )
  }
})
