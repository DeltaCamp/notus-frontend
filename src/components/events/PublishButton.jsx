import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import Switch from 'react-bulma-switch'
import {
  Cast,
  CloudOff
} from 'react-feather'

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

      return <>
        <Switch
          data-tip
          data-for='publish-button-hint'
          value={this.props.event.isPublic}
          onChange={this.props.handleTogglePublish}
          disabled={!confirmed}
          color='link'
        >
          shared with the Notus community 
          {/* {this.props.event.isPublic
            ? <><Cast />Published</>
            : <><CloudOff />Private</>
          } */}
        </Switch>
        <ReactTooltip
          id='publish-button-hint'
          place='top'
          effect='solid'
          getContent={[this.hintText, 1000]}
        />
      </>
    }
  }
)