import React, { Component } from 'react'

import { KEYS } from '~/constants'

export const TextInput = class _TextInput extends Component {
  state = {
    value: this.props.matcher.operand,
    previousValue: this.props.matcher.operand
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
    this.props.handleSetEditMatcher()

    if (this.refs.inputRef.value === '0') {
      this.refs.inputRef.setSelectionRange(
        0,
        this.refs.inputRef.value.length
      )
    }
  }

  render () {
    return <input
      type='text'
      className='input'
      ref='inputRef'
      value={this.state.value}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      onKeyUp={this.handleKeyUp}
      onClick={this.handleClick}
      placeholder='0'
      style={{
        width: ((this.state.value.length + 1) * 16)
      }}
    />
  }
}
