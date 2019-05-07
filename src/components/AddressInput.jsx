import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'
import classnames from 'classnames'
import { ethers } from 'ethers'

export const AddressInput = ReactTimeout(class _AddressInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }
  
  componentDidUpdate = () => {
    ReactTooltip.rebuild()
    // this.props.setTimeout(ReactTooltip.rebuild)
  }

  valid = () => {
    try {
      ethers.utils.getAddress(this.props.value)
      return true
    } catch {
      return false
    }
  }

  render() {
    return <input
      data-tip={!this.valid() ? 'Please enter a valid Ethereum address (42 characters, starts with "0x")' : this.props.value}
      type='text'
      className={classnames(
        'input',
        'is-truncated',
        {
          'has-border-danger': this.props.value.length && !this.valid(),
          'has-border-success': this.props.value.length && this.valid()
        }
      )}
      ref='inputRef'
      placeholder={this.props.placeholder}
      value={this.props.value}
      onChange={this.props.onChange}
    />
  }
})
