import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import Switch from 'react-bulma-switch'

import { withCurrentUser } from '~/components/withCurrentUser'

export const AbiEventVisibleButton = withCurrentUser(
  class _AbiEventVisibleButton extends Component {
    static propTypes = {
      contract: PropTypes.object.isRequired,
      abiEvent: PropTypes.object.isRequired,
      handleToggleAbiEventVisible: PropTypes.func.isRequired
    }

    componentDidUpdate = () => {
      ReactTooltip.rebuild()
    }

    hintText = () => {
      if (!this.isAuthor()) {
        return `You are not the owner of this contract.`
      }

      const text = this.props.abiEvent.isPublic
        ? `ABI Event is visible in event forms.`
        : `ABI Event is hidden in event forms.`

      return text
    }

    isAuthor = () => {
      const { currentUser, contract } = this.props
      
      return currentUser && 
        (parseInt(currentUser.id, 10) === parseInt(contract.ownerId, 10))
    }

    handleToggleAbiEvent = (e) => {
      this.props.handleToggleAbiEventVisible(this.props.abiEvent)
    }

    render() {
      return <>
        <Switch
          data-tip
          data-for={`abi-event-input-publish-button-hint-${this.props.abiEvent.id}`}
          value={this.props.abiEvent.isPublic}
          onChange={this.handleToggleAbiEvent}
          disabled={!this.isAuthor()}
          color='light'
          className='is-content-justified-center mobile--is-content-justified-left is-flex'
          style={{ position: 'relative' }}
        >
        </Switch>
        <ReactTooltip
          id={`abi-event-input-publish-button-hint-${this.props.abiEvent.id}`}
          place='top'
          effect='solid'
          getContent={[this.hintText, 1000]}
        />
      </>
    }
  }
)