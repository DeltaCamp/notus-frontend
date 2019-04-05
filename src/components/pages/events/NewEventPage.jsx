import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

import { EVENT_TYPES } from '~/../config/eventTypes'

export const NewEventPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  class _NewEventPage extends PureComponent {
    state = {}

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

    handleSubmitEvent = (e) => {
      e.preventDefault()

    }

    handleVariable = (variable) => {
      this.setState({
        isEditing: true
      })
    }

    buttonColor = (id) => {
      const classes = [
        'is-link',
        'is-info',
        'is-fun',
        'is-primary',
        'is-purple',
        'is-success',
        'is-danger',
        'is-warning'
      ]

      return classes[id % classes.length]
    }

    render () {
      if (this.state.redirect) {
        return <Redirect to={routes.SIGNIN} />
      }

      const eventTypeId = this.props.match.params.eventTypeId

      const event = EVENT_TYPES.find(
        (eventType) => (eventType.id === parseInt(eventTypeId, 10))
      )

      if (!event) {
        return <Redirect to={routes.DISCOVER_EVENTS} />
      }

      const colorClass = this.buttonColor(event.id)
      const altColorClass = this.buttonColor(event.id + 1)

      const variableForm = (
        <div className='drawer has-bg__dark'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 has-text-centered'>
                <form className='form mt20'>
                  <div className='field'>
                    <div className='control'>
                      <div className='select'>
                        <select>
                          <option>
                            More than
                          </option>
                          <option>
                            Less than
                          </option>
                          <option>
                            Is equal to
                          </option>
                          <option>
                            Is greater than or equal to
                          </option>
                          <option>
                            Is less than or equal to
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className='field'>
                    <div className='control'>
                      <input
                        placeholder='Amount in Ether'
                        type='number'
                        className='input is-small'
                        onChange={(e) => {
                          this.setState({
                            variableValueOne: e.target.value
                          })
                        }}
                        value={this.state.variableValueOne}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
            in={this.state.isEditing}
          >
            {state => variableForm}
          </CSSTransition>

          <section className='section section--main-content'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 has-text-centered'>
                  <h4 className='is-size-4 has-text-centered is-uppercase has-text-weight-extrabold mt20'>
                    {event.name}
                  </h4>
                </div>
              </div>

              <div className='row'>
                <div className='col-xs-12 has-text-centered'>
                  <div className={`is-size-4 event-box event-box__header ${colorClass}`}>
                    <button
                      className='event-box__variable'
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleVariable('frequency')
                      }}
                    >
                      Every time
                    </button>
                    <button
                      className='event-box__variable'
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleVariable('matcher-one')
                      }}
                    >
                      more than 200
                    </button>
                    <span className='event-box__text'>
                      of the token at
                    </span>
                    <button
                      className='event-box__variable has-hint'
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleVariable('contract-address')
                      }}
                    >
                      0x1234...5619
                      <span className='hint'>Contract Address</span>
                    </button>
                    <button
                      className='event-box__variable'
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleVariable('sender-receiver')
                      }}
                    >
                      is sent to 0x1234
                    </button>
                  </div>

                  <div className={`is-size-4 event-box event-box__footer ${altColorClass}`}>
                    ... then turn on my Phillips Hue lightbulb
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
