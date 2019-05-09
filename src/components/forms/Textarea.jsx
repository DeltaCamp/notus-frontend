import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { KEYS } from '~/constants'

export const Textarea = class _Textarea extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onEscape: PropTypes.func
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
      this.onEscape()
    }
  }

  handleKeyDown = (e) => {
    if (e.keyCode === KEYS.tab) {
      e.preventDefault();
      let start = this.refs.textAreaRef.selectionStart;
      let end = this.refs.textAreaRef.selectionEnd;
      const value = this.props.value.substring(0, start) + "\t" + this.props.value.substring(end)
      this.refs.textAreaRef.selectionStart = start + 1;
      this.refs.textAreaRef.selectionEnd = start + 1;
      this.props.onChange(value)
    }
  }

  render () {
    const props = {
      ...this.props,
      onKeyDown: this.handleKeyDown
    }
    return (
      <textarea
        ref='textAreaRef'
        {...props}
      />
    )
  }
}
