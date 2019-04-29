import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { formatRoute } from 'react-router-named-routes'
import {
  AlertTriangle,
  StopCircle,
  CheckCircle,
  Edit
} from 'react-feather'
import { toast } from 'react-toastify'
import { Settings } from 'react-feather'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { updateEventMutation } from '~/mutations/updateEventMutation'
import { brandColor } from '~/utils/brandColors'
import * as routes from '~/../config/routes'

export const EventCard = 
  graphql(currentUserQuery, { name: 'currentUserData' })(
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
         
          const { currentUserData } = this.props

          if (currentUserData && !currentUserData.currentUser) {
            toast('You will need to sign up (or sign in) to create events.')
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
              'eventsQuery',
            ],
          }).then((mutationResult) => {
            this.deactivateEditMenu()
            toast.dismiss()
            toast.success(`Event ${event.isActive ? 'deactivated' : 're-activated'}`)
          }).catch(error => {
            toast.error('Error while updating event')
            console.error(error)
          })
        }

        author = () => {
          const { currentUserData, event } = this.props
          const { currentUser } = currentUserData
          const { user } = event

          if (currentUser && (currentUser.id === parseInt(user.id, 10))) {
            return 'you'
          } else {
            return (user.name || user.email)
          }
        }

        render () {
          let editDropdown

          const { currentUserData, editable, event } = this.props

          const isLoggedIn = currentUserData && currentUserData.currentUser

          const linkTo = isLoggedIn ? this.props.linkTo : routes.SIGNUP

          if (editable) {
            editDropdown = (
              <div
                className={classnames(
                  'dropdown',
                  'is-right',
                  'is-up',
                  { 'is-active': this.state.editDropdownActive }
                )
              }>
                <div className='dropdown-trigger'>
                  <div
                    className='button has-icon has-icon__transparent'
                    onClick={this.handleMenuClick}
                  >
                    <Settings />
                  </div>
                </div>
                <div className='dropdown-menu' id='dropdown-menu6' role='menu'>
                  <div className='dropdown-content'>
                    <div
                      className='dropdown-item'
                      onClick={this.handleEdit}
                    >
                      <Edit /> &nbsp;Edit
                    </div>
                    <div
                      className='dropdown-item'
                      onClick={this.handleActivate}
                    >
                      {event.isActive
                        ? (<><StopCircle /> &nbsp;Deactivate</>)
                        : (<><CheckCircle /> &nbsp;Activate</>)
                      }
                    </div>
                    <div
                      className='dropdown-item'
                      onClick={(e) => {
                        e.preventDefault()
                        this.props.handleOpenConfirmDeleteModal(event.id)
                      }}
                    >
                      <AlertTriangle /> &nbsp;Delete
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <Link
              key={`event-${event.id}`}
              to={linkTo}
              onClick={this.handleEventCardClick}
              ref={node => {this.node = node}}
              className={classnames(
                'button',
                'event-card',
                brandColor(event.id),
                {
                  'event-card--small': this.props.isSmall,
                  'is-half-opacity': !event.isActive,
                  'is-full-opacity': event.isActive
                }
              )}
            >
              <div className="event-card__header">
                <p className='event-card__title is-size-5'>
                  {event.title}
                </p>
              </div>

              <div className='event-card__footer'>
                <p className='event-card__author is-size-7'>
                  by {this.author()}
                </p>
                <div className='event-card__icons has-text-right'>
                  {editable ? editDropdown : ''}
                </div>
              </div>
            </Link>
          )
        }
      }
    )
  )