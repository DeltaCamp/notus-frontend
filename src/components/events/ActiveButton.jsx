import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import {
  CheckCircle,
  StopCircle
} from 'react-feather'

import { SCOPE_LABELS } from '~/constants'

export const ActiveButton = class _ActiveButton extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    handleToggleActive: PropTypes.func.isRequired
  }

  componentDidUpdate = () => {
    ReactTooltip.rebuild()
  }

  hintText = () => {
    const scopeTitle = SCOPE_LABELS[this.props.event.scope]

    const text = this.props.event.isActive
      ? `Currently triggering actions when ${scopeTitle}s occurs.`
      : `Currently not firing when ${scopeTitle}s occur.`

    return text
  }

  render() {
    return <>
      <button
        data-tip
        data-for='active-button-hint'
        className={classnames(
          'event-box__variable',
          'is-size-7',
          {
            'has-text-grey': !this.props.event.isActive
          }
        )}
        onClick={this.props.handleToggleActive}
      >
        {this.props.event.isActive
          ? <><CheckCircle /> Active</>
          : <><StopCircle /> Not Active</>
        }
      </button>
      <ReactTooltip
        type='light'
        id='active-button-hint'
        place='top'
        effect='solid'
        getContent={[this.hintText, 1000]}
      />
    </>
  }
}
