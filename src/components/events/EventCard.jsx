import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { toast } from 'react-toastify'
import { Settings } from 'react-feather'
import { graphql } from 'react-apollo'
import { formatRoute } from 'react-router-named-routes'
import { Link } from 'react-router-dom'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { deleteEventMutation } from '~/mutations/deleteEventMutation'
import { brandColor } from '~/utils/brandColors'
import * as routes from '~/../config/routes'

export const EventCard = 
  graphql(currentUserQuery, { name: 'currentUserData' })(
    graphql(deleteEventMutation, {
      name: 'deleteEventMutation'
    })(
      class _EventCard extends Component {
        state = {
          editDropdownActive: false  
        }

        handleClick = (e) => {
          const domNode = ReactDOM.findDOMNode(this.node)

          if (domNode && !domNode.contains(e.target)) {
            this.handleEditClick(e)
          }
        }

        handleEditClick = (e) => {
          e.preventDefault()

          this.setState({
            editDropdownActive: !this.state.editDropdownActive
          })

          if (this.state.editDropdownActive) {
            document.removeEventListener('mousedown', this.handleClick, false)
          } else {
            document.addEventListener('mousedown', this.handleClick, false)
          }
        }

        handleDeleteEvent = (e) => {
          e.preventDefault()
          
          const eventId = parseInt(this.props.event.id, 10)

          this.props.deleteEventMutation({
            variables: {
              eventId
            },
            refetchQueries: [
              'eventsQuery',
              'publicEventsQuery',
            ],
          }).then(() => {
            toast.success('Successfully deleted event!')
          }).catch(error => {
            console.error(error)
          })
        }

        render () {
          let editDropdown

          const { currentUserData, editable, event } = this.props
          const { currentUser } = currentUserData
          const { user } = event

          if (editable) {
            editDropdown = (
              <div className={classnames(
                'dropdown',
                'is-right',
                'is-up',
                { 'is-active': this.state.editDropdownActive }
              )}>
                <div className='dropdown-trigger'>
                  <button
                    className='button has-icon has-icon__transparent'
                    onClick={this.handleEditClick}
                  >
                    <Settings />
                  </button>
                </div>
                <div className='dropdown-menu' id='dropdown-menu6' role='menu'>
                  <div className='dropdown-content'>
                    <div
                      className='dropdown-item'
                      onClick={this.handleDeleteEvent}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <Link
              key={`event-${event.id}`}
              to={formatRoute(routes.NEW_EVENT_FROM_PARENT, { parentEventId: event.id })}
              className={`button event-card ${brandColor(event.id)}`}
              ref={node => {this.node = node}}
            >
              <div className="event-card__header">
                <p className='event-card__title is-size-5'>
                  {event.title}
                </p>
              </div>


              <div className='event-card__footer'>
                <p className='event-card__author is-size-7'>
                  by {currentUser.id === parseInt(user.id, 10) ? 'you' : user.name || user.email}
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