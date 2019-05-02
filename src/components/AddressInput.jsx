import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import { ethers } from 'ethers'

import { KEYS } from '~/constants'

export const AddressInput = ReactTimeout(class _AddressInput extends Component {
  state = {
    value: this.props.matcher.operand,
    previousValue: this.props.matcher.operand
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

    if (this.state.value !== this.state.previousValue && this.valid()) {
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

  valid = () => {
    try {
      ethers.utils.getAddress(this.state.value)
      return true
    } catch {
      return false
    }
  }

  render() {
    return <input
      data-tip={!this.valid() ? 'Please enter a valid Ethereum address (42 characters, starts with "0x")' : this.state.value}
      type='text'
      className={classnames(
        'input',
        'is-truncated',
        {
          'has-border-danger': this.state.value.length && !this.valid()
        }
      )}
      ref='inputRef'
      placeholder='0x0000000000000000000000000000000000000000'
      value={this.state.value}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      onKeyUp={this.handleKeyUp}
      onClick={this.handleClick}
      style={{
        width: 200
      }}
    />
  }
})
