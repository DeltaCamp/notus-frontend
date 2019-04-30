import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { OperatorSelect } from '~/components/OperatorSelect'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { KEYS, OPERATOR_LABELS } from '~/constants'

export class MatcherOperator extends Component {
  state = {
    isEditing: false
  }

  static propTypes = {
    abiEventInputId: PropTypes.number,
    handleEdit: PropTypes.func.isRequired,
    handleClearEditMatcher: PropTypes.func.isRequired,
    matcher: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    scope: PropTypes.number
  }

  handleStartEdit = (e) => {
    e.preventDefault()

    this.setState({
      isEditing: true
    })

    this.props.handleEdit()

    document.addEventListener('mousedown', this.handleClickAnywhere, false)
  }

  onChangeOperator = (option) => {
    const clone = deepCloneMatcher(this.props.matcher)
    clone.operator = option.value
    this.props.onChange(clone)

    this.handleStopEditing()
  }

  handleClickAnywhere = (e) => {
    const domNode = ReactDOM.findDOMNode(this.node)

    if (domNode && !domNode.contains(e.target)) {
      this.handleStopEditing()
    }
  }

  handleStopEditing = () => {
    this.setState({
      isEditing: false
    })

    this.props.handleClearEditMatcher()

    document.removeEventListener('mousedown', this.handleClickAnywhere, false)
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEYS.escape) {
      this.handleStopEditing()
    }
  }

  render () {
    const { matcher } = this.props
    const { abiEventInputId, operator } = matcher

    return (
      <>
        {this.state.isEditing
          ? (
            <div
              ref={node => { this.node = node }}
              className='event-box__variable has-react-select'
              onKeyUp={this.handleKeyUp}
            >
              <OperatorSelect
                source={matcher.source}
                abiEventInputId={abiEventInputId}
                value={matcher.operator}
                onChange={this.onChangeOperator}
                menuIsOpen={this.state.isEditing}
              />
            </div>
          )
          : (
            <button
              className='event-box__variable has-react-select'
              onClick={this.handleStartEdit}
            >
              {OPERATOR_LABELS[operator]}
            </button>
          )
        }
      </>
    )
  }
}
