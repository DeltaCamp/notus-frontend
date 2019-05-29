import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { formatRoute } from 'react-router-named-routes'
import {
  StopCircle,
  Cast,
  CheckCircle,
  Lock,
  Mail,
  User
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
          // e.preventDefault()

          const { currentUserData } = this.props || {}

          if (currentUserData && !currentUserData.currentUser) {
            notusToast.info('You will need to sign up (or sign in) to create events.')
          }
        }

        handleActivate = (e) => {
          e.preventDefault()

          const event = this.props.event

          this.props.updateEventMutation({
            variables: {
              event: {
                id: event.id,
                isActive: !event.isActive
              }
            },
            refetchQueries: [
              'eventsQuery'
            ]
          }).then((mutationResult) => {
            this.deactivateEditMenu()
            notusToast.success(`Event ${event.isActive ? 'deactivated' : 're-activated'}`)
          }).catch(error => {
            notusToast.error('Error while updating event')
            console.error(error)
          })
        }

        author = () => {
          const { currentUserData, event } = this.props || {}
          const { currentUser } = currentUserData || {}
          const { user } = event

          if (currentUser && (currentUser.id === parseInt(user.id, 10))) {
            return 'you'
          } else {
            return (user.name || user.email)
          }
        }

        render () {
          const { currentUserData, event } = this.props

          const isLoggedIn = currentUserData && currentUserData.currentUser

          const linkTo = isLoggedIn ? this.props.linkTo : routes.SIGNUP

          const sendEmail = event ? event.sendEmail : false

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
                <p className='event-card__title is-size-5'>
                  {event.title}
                </p>

                <div className='event-card__icons is-size-7'>
                  {event.isPublic
                    ? (<><Cast /> &nbsp;Public</>)
                    : (<><Lock /> &nbsp;Private</>)
                  }
                </div>
              </div>

              <div className='event-card__footer event-card__author is-size-7'>
                <div className='event-card__icons'>
                  <User /> &nbsp;by {this.author()}
                </div>
                <div className='event-card__icons has-text-right'>
                  {/* {editable ? editDropdown : ''} */}
                  {event.isActive
                    ? (<><CheckCircle /> &nbsp;Active</>)
                    : (<><StopCircle /> &nbsp;Inactive</>)
                  }
                </div>
                {sendEmail &&
                  <div className='event-card__icons has-text-right'>
                    Sends &nbsp;<Mail />
                  </div>
                }
              </div>
            </Link>
          )
        }
      }
    )
  )
