import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { formatRoute } from 'react-router-named-routes'
import {
  Cast,
  Check,
  Lock,
  User,
  X
} from 'react-feather'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import { withCurrentUser } from '~/components/withCurrentUser'
import { updateEventMutation } from '~/mutations/updateEventMutation'
import { notusToast } from '~/utils/notusToast'
import * as routes from '~/../config/routes'

export const EventCard =
  withCurrentUser(
    graphql(updateEventMutation, {
      name: 'updateEventMutation'
    })(
      class _EventCard extends Component {
        state = {
          editDropdownActive: false
        }

        handleClick = (e) => {
          const domNode = ReactDOM.findDOMNode(this.node)

          if (domNode && !domNode.contains(e.target)) {
            this.deactivateEditMenu()
          }
        }

        handleEdit = (e) => {
          e.preventDefault()

          const event = this.props.event
          const editPath = formatRoute(routes.EDIT_EVENT, { eventId: event.id })

          this.props.history.push(editPath)
        }

        handleMenuClick = (e) => {
          e.preventDefault()

          if (this.state.editDropdownActive) {
            this.deactivateEditMenu()
          } else {
            this.activateEditMenu()
          }
        }

        deactivateEditMenu = () => {
          this.setState({
            editDropdownActive: false
          })

          document.removeEventListener('mousedown', this.handleClick, false)
        }

        activateEditMenu = () => {
          this.setState({
            editDropdownActive: true
          })

          document.addEventListener('mousedown', this.handleClick, false)
        }

        handleEventCardClick = (e) => {
          const { currentUserData } = this.props || {}

          if (currentUserData && !currentUserData.currentUser) {
            notusToast.info('You will need to sign up or sign in to create events.')
          }
        }

        authorName = () => {
          const { event } = this.props || {}
          const { user } = event

          if (this.isAuthor()) {
            return 'you'
          } else if (user.name.length > 0) {
            return user.name
          } else {
            return ''
          }
        }

        isAuthor = () => {
          const { currentUserData, event } = this.props || {}
          const { currentUser } = currentUserData || {}
          const { user } = event

          return (currentUser && (currentUser.id === user.id))
        }

        render () {
          const { currentUserData, event } = this.props

          const isLoggedIn = currentUserData && currentUserData.currentUser

          const linkTo = isLoggedIn ? this.props.linkTo : routes.SIGNUP

          const isAuthor = this.isAuthor()

          // const sendEmail = event ? event.sendEmail : false

          return (
            <Link
              key={`event-${event.id}`}
              to={linkTo}
              onClick={this.handleEventCardClick}
              ref={node => { this.node = node }}
              className={classnames(
                'button',
                'event-card',
                {
                  'event-card--small': this.props.isSmall
                }
              )}
              style={{
                backgroundColor: event.color
              }}
            >
              <div className='event-card__header'>
                <p className='event-card__title is-size-3 has-font-weight-extrabold'>
                  {event.title}
                </p>

                {isAuthor && <>
                  <div className='is-size-8'>
                    <span className='has-text-lighter'>Runs:</span> {event.runCount === 0 ? 'Off' :
                      event.runCount === -1 ? 'Every time' : 'Next time'
                    }
                  </div>
                  <div className='is-size-8'>
                    <span className='has-text-lighter'>Sends an email: </span>{event.sendEmail ? <Check className='is-xsmall' /> : <span className='has-text-lighter'><X className='is-xsmall' /></span>}
                  </div>
                  <div className='is-size-8'>
                    <span className='has-text-lighter'>Triggers a webhook: </span>{event.callWebhook ? <Check className='is-xsmall' /> : <span className='has-text-lighter'><X className='is-xsmall' /></span>}
                  </div>
                </>}
              </div>

              <div className='event-card__footer event-card__author is-size-7'>

                <div className='event-card__icons'>
                  {
                    this.authorName().length > 0 && <>
                      <User />&nbsp;By {this.authorName()}
                    </>
                  }
                </div>

                <div className='event-card__icons has-text-right'>
                  {isAuthor && (
                    event.isPublic
                      ? (<><Cast /> &nbsp;Public</>)
                      : (<><Lock /> &nbsp;Private</>)
                    )
                  }
                </div>
              </div>
            </Link>
          )
        }
      }
    )
  )
