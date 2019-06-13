import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import Switch from 'react-bulma-switch'

import { withCurrentUser } from '~/components/withCurrentUser'

export const PublishButton = withCurrentUser(
  class _PublishButton extends Component {
    static propTypes = {
      event: PropTypes.object.isRequired,
      handleTogglePublish: PropTypes.func.isRequired
    }

    componentDidUpdate = () => {
      ReactTooltip.rebuild()
    }

    hintText = () => {
      const { currentUser } = this.props
      if (currentUser && !currentUser.confirmedAt) {
        return `You will need to confirm your ${currentUser.email} email address prior to sharing events.`
      }

      const text = this.props.event.isPublic
        ? `Currently visible for other Notus customers to create events based off of.`
        : `This event is only visible by you.`

      return text
    }

    render() {
      const { currentUser } = this.props
      const confirmed = currentUser && currentUser.confirmedAt

      return <span data-tip data-for='publish-event-button-hint'>
        <Switch
          value={this.props.event.isPublic}
          onChange={this.props.handleTogglePublish}
          disabled={!confirmed}
          color='light'
        >
          is public
        </Switch>
        <ReactTooltip
          id='publish-event-button-hint'
          place='top'
          effect='solid'
          getContent={[this.hintText, 1000]}
        />
      </span>
    }
  }
)