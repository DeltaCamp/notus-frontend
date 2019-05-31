import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import {
  CheckCircle,
  StopCircle
} from 'react-feather'

import { withCurrentUser } from '~/components/withCurrentUser'
import { SCOPE_LABELS } from '~/constants'

export const ActiveButton = withCurrentUser(
  class _ActiveButton extends Component {
    static propTypes = {
      event: PropTypes.object.isRequired,
      handleToggleActive: PropTypes.func.isRequired
    }

    componentDidUpdate = () => {
      ReactTooltip.rebuild()
    }

    hintText = () => {
      const { currentUser } = this.props
      const scopeTitle = SCOPE_LABELS[this.props.event.scope]

      if (currentUser && !currentUser.confirmedAt) {
        return `You will need to confirm your ${currentUser.email} email address prior to this event firing`
      }

      const text = this.props.event.isActive
        ? `Currently triggering actions when ${scopeTitle}s occurs.`
        : `Currently not firing when ${scopeTitle}s occur.`

      return text
    }

    render() {
      const { currentUser } = this.props
      const confirmed = currentUser && currentUser.confirmedAt
      
      return <>
        <button
          data-tip
          data-for='active-button-hint'
          className={classnames(
            'event-box__variable',
            'flex-button',
            'is-size-7',
            {
              'event-box__variable-disabled': !confirmed,
              'has-text-lighter': !this.props.event.isActive
            }
          )}
          onClick={this.props.handleToggleActive}
        >
          {this.props.event.isActive
            ? <><CheckCircle /> Active</>
            : <><StopCircle /> Not active</>
          }
        </button>
        <ReactTooltip
          id='active-button-hint'
          place='top'
          effect='solid'
          getContent={[this.hintText, 1000]}
        />
      </>
    }
  }
)