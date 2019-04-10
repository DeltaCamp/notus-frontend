import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classnames from 'classnames'
import { CheckCircle } from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { EditEventVariableForm } from '~/components/events/EditEventVariableForm'
import { EventVariableButton } from '~/components/events/EventVariableButton'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { saveEventMutation } from '~/mutations/saveEventMutation'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { altBrandColor, brandColor } from '~/utils/brandColors'
import { rollbar } from '~/../config/rollbar'
import { EVENT_TYPES } from '~/../config/eventTypes'
import * as routes from '~/../config/routes'
import * as CONSTANTS from '~/constants'

export const NewEventPage = graphql(saveEventMutation, { name: 'saveEventMutation' })(
  graphql(currentUserQuery, { name: 'currentUserData' })(
    class _NewEventPage extends Component {
      state = {
        event: {
          frequency: 'default',
          comparison: '',
          amount: '0',
          contractAddress: '',
          senderAddress: '',
          recipientAddress: '',
          createdAt: null
        },
        editVariables: [],
        variableOne: '',
        variableTwo: '',
        variableThree: ''
      }

      static propTypes = {
        match: PropTypes.object.isRequired
      }

      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      componentWillMount() {
        const { currentUser } = this.props.currentUserData

        if (!currentUser) {
          toast.error('Please sign in to access this page.')
          this.setState({ redirect: true })
        }
      }

      handleSaveEvent = (e) => {
        e.preventDefault()
        console.log('event', this.state.event)

        this.props.saveEventMutation().then(() => {
          // this.closeMobileNav()
          // this.props.history.push(routes.SIGNIN)
          // toast('Successfully signed out. Thanks for using Notus!')
        }).catch(error => {
          console.error(error)
        })
      }

      handleVariables = (variableArray) => {
        this.setState({
          editVariables: variableArray
        })
      }

      handleCancelVariable = (e) => {
        e.preventDefault()

        this.handleVariables([])
      }

      handleVariableChange = (varName, type, val) => {
        const key = varName === 'variableOne'
          ? this.state.editVariables[0]
          : this.state.editVariables[1]

        if (type === 'decimal') {
          // note: currently does not handle negative values:
          val = val.replace(/[^0-9.]/g, '')
        }

        this.setState({
          [varName]: val
        }, this.updateEvent(key, val))
      }

      updateEvent = (key, val) => {
        this.setState({
          event: {
            ...this.state.event,
            [key]: val
          }
        })
      }

      isEditing = () => {
        return this.state.editVariables.length > 0
      }

      render () {
        let colorClass,
          altColorClass

        if (this.state.redirect) {
          return <Redirect to={routes.SIGNIN} />
        }

        const eventTypeId = this.props.match.params.eventTypeId

        let event = EVENT_TYPES.find(
          (eventType) => (eventType.id === parseInt(eventTypeId, 10))
        )

        if (event) {
          colorClass = brandColor(event.id)
          altColorClass = altBrandColor(event.id + 1)
        } else {
          event = {
            name: 'When this happens trigger that'
          }
          colorClass = 'is-dark'
          altColorClass = 'is-blue'
        }

        const variableForm = (
          <>          
            <div className='drawer has-bg__dark'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-8 col-start-sm-3 has-text-centered'>
                    <form className='form mt20'>

                      <EditEventVariableForm
                        editVariables={this.state.editVariables}
                        event={this.state.event}
                        handleVariableChange={this.handleVariableChange}
                      />

                      <div className='buttons'>
                        {/* <button
                          className='button has-icon has-stroke-red'
                          onClick={this.handleCancelVariable}
                        >
                          <XCircle
                            className='icon__button has-stroke-red'
                          />
                        </button> */}

                        <button
                          className='button has-icon has-stroke-green'
                          onClick={this.handleCancelVariable}
                        >
                          <CheckCircle
                            className='icon__button has-stroke-green'
                          />
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* this needs to be at the bottom or it takes the <CSSTransition/> classes */}
            <div
              className={`drawer__clickbox ${this.isEditing() ? 'is-active' : null}`}
              onClick={(e) => {
                e.preventDefault()
                this.handleVariables([])
              }}
            />
          </>
        )

        return (
          <div className='is-positioned-absolutely'>
            <Helmet
              title='Create New Event'
            />

            <ScrollToTop />

            <CSSTransition
              timeout={300}
              classNames='drawer'
              in={this.isEditing()}
            >
              {state => variableForm}
            </CSSTransition>

            <section className='section section--main-content'>
              <div className={`container-fluid pb20 is-dark`}>
                <div className='container'>
                  <div className='row'>
                    <div className='col-xs-12 has-text-centered is-size-4'>
                    {/* <div className='col-xs-12 col-sm-8 col-start-sm-3 has-text-centered'> */}
                      <h6 className='is-size-6 has-text-grey-lighter has-text-centered is-uppercase has-text-weight-bold mt20 pt20 pb20'>
                        {event.name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`event-box event-box__header ${colorClass}`}>
                <div className={`container-fluid pt50 pb20`}>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-xs-12 col-xl-10 col-start-xl-3 is-size-4'>
                        <EventVariableButton
                          editVariables={this.state.editVariables}
                          event={this.state.event}
                          handleVariables={this.handleVariables}
                          variable={{
                            name: 'frequency',
                            type: 'string'
                          }}
                        />
                        an ERC20 Transfer event occurs
                        <br />
                        <span className='event-box__text'>
                          where the token contract address is 
                          <EventVariableButton
                            editVariables={this.state.editVariables}
                            event={this.state.event}
                            handleVariables={this.handleVariables}
                            variable={{
                              name: 'contractAddress',
                              type: 'address'
                            }}
                          />
                        </span>

                        <br />
                        <span className='event-box__text'>
                          and the amount is
                          <EventVariableButton
                            editVariables={this.state.editVariables}
                            event={this.state.event}
                            handleVariables={this.handleVariables}
                            variable={{
                              name: 'amount',
                              type: 'uint256'
                            }}
                          /> &lt;ether&gt;
                        </span>

                        <br />
                        <span className='event-box__text'>
                          and the sender is 
                          <EventVariableButton
                            editVariables={this.state.editVariables}
                            event={this.state.event}
                            handleVariables={this.handleVariables}
                            variable={{
                              name: 'senderAddress',
                              type: 'address'
                            }}
                          />
                        </span>

                        <br />
                        <span className='event-box__text'>
                          and the recipient is 
                          <EventVariableButton
                            editVariables={this.state.editVariables}
                            event={this.state.event}
                            handleVariables={this.handleVariables}
                            variable={{
                              name: 'recipientAddress',
                              type: 'address'
                            }}
                          />
                        </span>
                        {/* {<VariableButton />} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`event-box event-box__footer ${altColorClass}`}>
                <div className={`container-fluid`}>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-xs-12 has-text-centered is-size-4'>
                        {/* ... then turn on my Phillips Hue lightbulb */}
                        ... then send me an email
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`is-white-ter pt30 pb30`}>
                <div className={`container-fluid`}>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-xs-12 has-text-centered is-size-4'>
                        <button
                          onClick={this.handleSaveEvent}
                          className='button is-success'
                        >
                          {!this.state.event.createdAt ? 'Create' : 'Save'} Event
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FooterContainer />
          </div>
        )
      }
    }
  )
)