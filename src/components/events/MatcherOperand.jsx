import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import ReactTimeout from 'react-timeout'

import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { KEYS } from '~/constants'

export const MatcherOperand = ReactTimeout(class extends Component {
  state = {
    isEditing: false,
    newOperand: ''
  }

  static propTypes = {
    handleEdit: PropTypes.func.isRequired,
    matcher: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentDidUpdate() {
    this.props.setTimeout(ReactTooltip.rebuild)
  }

  handleStartEdit = (e) => {
    e.preventDefault()

    this.setState({
      isEditing: true,
      newOperand: this.props.matcher.operand
    })

    this.props.handleEdit()
  }

  handleSubmit = () => {
    if (this.props.matcher.operand === this.state.newOperand) {
      this.handleCancel()
      return
    }

    const clone = deepCloneMatcher(this.props.matcher)
    clone.operand = this.state.newOperand
    this.props.onChange(clone)

    this.handleCancel()
  }

  handleChange = (e) => {
    this.setState({
      newOperand: e.target.value
    })
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.handleCancel()
    } else if (e.keyCode === KEYS.enter) {
      this.handleSubmit()
    }
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
      newOperand: ''
    })
  }

  render () {
    const { matcher } = this.props

    if (matcher.operator === 0) {
      return null
    }

    return (
      <>
        {this.state.isEditing
          ? (
            <div className='event-box__variable has-text-input'>
              <input
                className='input'
                type='text'
                value={this.state.newOperand}
                onChange={this.handleChange}
                onBlur={this.handleSubmit}
                onKeyUp={this.handleKeyUp}
                autoFocus
                style={{ width: ((this.state.newOperand.length + 1) * 16) }}
              />
            </div>
          )
          : (
            <button
              className='event-box__variable has-text-input event-box__variable--truncated'
              onClick={this.handleStartEdit}
              data-tip={matcher.operand.length > 16 ? matcher.operand : ''}
            >
              {matcher.operand || 0}
            </button>
          )
        }
      </>
    )
  }
})
