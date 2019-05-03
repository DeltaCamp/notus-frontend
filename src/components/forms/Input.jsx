import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { KEYS } from '~/constants'

export const Input = class _Input extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleStartEditing: PropTypes.func
  }

  state = {
    value: this.props.value,
    previousValue: this.props.value
  }

  componentDidUpdate() {
    const isValueChanged = this.props.value !== this.state.value
    if (isValueChanged && !this.state.editing) { 
      this.setState({
        value: this.props.value,
        previousValue: this.props.value
      })
    }
  }

  onCancel = () => {
    this.setState({
      value: this.state.previousValue,
      editing: false
    })
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  submit = () => {
    this.props.handleSubmit(this.state.value)
  }

  handleBlur = (e) => {
    e.preventDefault()

    const newState = {
      editing: false
    }

    let callback = undefined

    if (this.state.value !== this.state.previousValue) {
      newState.previousValue = this.state.value
      callback = this.submit
    }

    this.setState(newState, callback)
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.onCancel()
    } else if (e.keyCode === KEYS.enter) {
      this.refs.inputRef.blur()
    }
  }

  startedEditing = () => {
    if (this.props.handleStartEditing) {
      this.props.handleStartEditing()
    }
  }

  handleFocus = () => {
    this.setState({
      editing: true
    }, this.startedEditing)
  }

  render () {
    return (
      <input
        placeholder={this.props.placeholder}
        type='text'
        ref='inputRef'
        className={this.props.className}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
      />
    )
  }
}
