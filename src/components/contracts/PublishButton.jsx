import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import Switch from 'react-bulma-switch'

import { Help } from '~/components/Help'
import { withCurrentUser } from '~/components/withCurrentUser'

export const PublishButton = withCurrentUser(
  class _PublishButton extends Component {
    static propTypes = {
      contract: PropTypes.object.isRequired,
      handleTogglePublish: PropTypes.func.isRequired
    }

    componentDidUpdate = () => {
      ReactTooltip.rebuild()
    }

    hintText = () => {
      if (!this.isAuthor()) {
        return `You are not the owner of this contract.`
      }

      if (!this.userPaid()) {
        return `Only paid accounts can have private contracts.`
      }

      const text = this.props.contract.isPublic
        ? `Currently available for other Notus customers to create events based off this contract.`
        : `This contract is only available to you.`

      return text
    }

    isAuthor = () => {
      const { currentUser, contract } = this.props

      if (!currentUser || !contract) {
        return false
      }

      return currentUser && contract &&
        (parseInt(currentUser.id, 10) === parseInt(contract.ownerId, 10))
    }

    userPaid = () => {
      const { currentUser } = this.props

      return currentUser
        && currentUser.isPaid
    }

    handleTogglePublish = (e) => {
      this.props.handleTogglePublish(this.props.contract)
    }

    render() {
      let helpText

      if (!this.userPaid() && this.isAuthor()) {
        helpText = <>
          &nbsp;
          <Help
            id='abi-event-title'
            text={`Only paid users can have private contracts`}
          />
        </>
      }

      return <>
        <Switch
          data-tip
          data-for='publish-button-hint'
          value={this.props.contract.isPublic}
          onChange={this.handleTogglePublish}
          disabled={!this.userPaid() || !this.isAuthor()}
          color='light'
        >
          is public {helpText}
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