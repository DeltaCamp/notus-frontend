import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import Switch from 'react-bulma-switch'

import { withCurrentUser } from '~/components/withCurrentUser'

export const AbiEventInputVisibleButton = withCurrentUser(
  class _AbiEventInputVisibleButton extends Component {
    static propTypes = {
      abiEventInput: PropTypes.object.isRequired,
      handleToggleAbiEventInput: PropTypes.func.isRequired
    }

    componentDidUpdate = () => {
      ReactTooltip.rebuild()
    }

    hintText = () => {
      if (!this.isAuthor()) {
        return `You are not the owner of this contract.`
      }

      const text = this.props.abiEventInput.isPublic
        ? `Visible in event forms.`
        : `This input is hidden in event forms.`

      return text
    }

    isAuthor = () => {
      const { currentUser, abiEventInput } = this.props
      const contract = abiEventInput.contract
      
      return currentUser && 
        (parseInt(currentUser.id, 10) === parseInt(contract.ownerId, 10))
    }

    handleToggleAbiEventInput = (e) => {
      this.props.handleToggleAbiEventInput(this.props.abiEventInput)
    }

    render() {
      return <>
        <Switch
          data-tip
          data-for={`abi-event-input-publish-button-hint-${this.props.abiEventInput.id}`}
          value={this.props.abiEventInput.isPublic}
          onChange={this.handleToggleAbiEventInput}
          disabled={!this.isAuthor()}
          color='light'
        >
          
        </Switch>
        <ReactTooltip
          id={`abi-event-input-publish-button-hint-${this.props.abiEventInput.id}`}
          place='top'
          effect='solid'
          getContent={[this.hintText, 1000]}
        />
      </>
    }
  }
)