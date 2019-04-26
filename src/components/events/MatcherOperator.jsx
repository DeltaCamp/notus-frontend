import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { OperatorSelect } from '~/components/OperatorSelect'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { OPERATOR_LABELS } from '~/constants'

export class MatcherOperator extends Component {
  state = {
    isEditing: false
  }

  static propTypes = {
    abiEventInputId: PropTypes.number,
    handleEdit: PropTypes.func.isRequired,
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
  }

  onChangeOperator = (option) => {
    const clone = deepCloneMatcher(this.props.matcher)
    clone.operator = option.value
    this.props.onChange(clone)
    
    this.setState({
      isEditing: false
    })
  }

  render () {
    const { matcher } = this.props
    const { abiEventInputId, operator } = matcher
    
    return (
      <>
        {this.state.isEditing
          ? (
            <div className="event-box__variable">
              <OperatorSelect
                source={matcher.source}
                abiEventInputId={abiEventInputId}
                value={matcher.operator}
                onChange={this.onChangeOperator}
              />
            </div>
          )
          : (
            <button
              className='event-box__variable'
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