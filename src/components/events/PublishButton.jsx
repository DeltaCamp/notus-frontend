import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import {
  Cast,
  CloudOff
} from 'react-feather'

export const PublishButton = class _PublishButton extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    handleTogglePublish: PropTypes.func.isRequired
  }

  componentDidUpdate = () => {
    ReactTooltip.rebuild()
  }

  hintText = () => {
    const text = this.props.event.isPublic
      ? `This shows up as a useable event for other Notus customers sitewide.`
      : `Only you are able to see this event.`

    return text
  }

  render() {
    return <>
      <button
        data-tip
        data-for='publish-button-hint'
        className={classnames(
          'no-mr',
          'event-box__variable',
          'is-size-7',
          {
            'has-text-lighter': !this.props.event.isPublic
          }
        )}
        onClick={this.props.handleTogglePublish}
      >
        {this.props.event.isPublic
          ? <><Cast />Published</>
          : <><CloudOff />Private</>
        }
      </button>
      <ReactTooltip
        type='light'
        id='publish-button-hint'
        place='top'
        effect='solid'
        getContent={[this.hintText, 1000]}
      />
    </>
  }
}
