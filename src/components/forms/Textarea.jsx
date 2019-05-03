import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { KEYS } from '~/constants'

export const Textarea = class _Textarea extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  submit = () => {
    this.props.onChange(this.state.value)
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
    }
  }

  handleKeyDown = (e) => {
    if (e.keyCode === KEYS.tab) {
      e.preventDefault();
      let start = this.refs.textAreaRef.selectionStart;
      let end = this.refs.textAreaRef.selectionEnd;
      const value = this.state.value.substring(0, start) + "\t" + this.state.value.substring(end)
      this.setState({
        value
      }, () => {
        this.refs.textAreaRef.selectionStart = start + 1;
        this.refs.textAreaRef.selectionEnd = start + 1;
      })
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
      <textarea
        ref='textAreaRef'
        placeholder={this.props.placeholder}
        className={this.props.className}
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
      />
    )
  }
}
