import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import Switch from 'react-bulma-switch'

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
        return `Cannot edit as you are not the owner of this contract.`
      }

      if (!this.userPaid()) {
        return `Private contracts will be available at a future date.`
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
      // this.props.handleTogglePublish(this.props.contract)
    }

    render() {
      let helpText

      return <span data-tip='wtf' data-for='publish-button-hint'>
        <Switch
          value={this.props.contract.isPublic}
          onChange={this.handleTogglePublish}
          color='light'
          className={
            classnames(
              {
                disabled: !this.userPaid() || !this.isAuthor()
              }
            )
          }
        >
          Contract is public
        </Switch>
        
        <ReactTooltip
          id='publish-button-hint'
          place='top'
          effect='solid'
          getContent={[this.hintText, 1000]}
        />
      </span>
    }
  }
)