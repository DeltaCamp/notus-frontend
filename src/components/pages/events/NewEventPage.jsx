import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classnames from 'classnames'
import { CheckCircle, XCircle } from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import * as routes from '~/../config/routes'

import { EVENT_TYPES } from '~/../config/eventTypes'
import * as CONSTANTS from '~/constants';

export const NewEventPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  class _NewEventPage extends PureComponent {
    state = {
      event: {
        frequency: 'default',
        comparison: 'default',
        amount: '[amount]',
        contractAddress: '[address]',
        senderOrReceiver: '[sent to] or [received by]',
        senderAddress: '[address]',
        receiverAddress: '[address]',
        createdAt: null
      },
      editVariables: [],
      variableOne: '',
      variableTwo: ''
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

    handleSubmitEvent = (e) => {
      e.preventDefault()

    }

    handleVariables = (variable) => {
      this.setState({
        editVariables: variable,
        isEditing: true
      })
    }

    drawerFormInputs = () => {
      let inputs = null

      if (this.state.editVariables.includes('frequency')) {
        inputs = (
          <>
            {this.frequencySelect()}
          </>
        )
      } else if (this.state.editVariables.includes('amount')) {
        inputs = <>
          {this.gtLtSelect()}
          {this.amountUintInput()}
        </>
      } else if (!this.state.editVariables.length) {
        inputs = null
      } else {
        inputs = null
        throw new Error('drawerFormInputs called with no matching variable type!')
      }

      return inputs
    }

    handleCancelVariable = (e) => {
      e.preventDefault()

      this.setState({
        isEditing: false
      })
    }

    handleSaveVariable = (e) => {
      e.preventDefault()

      // on success:
      // this.setState({
      //   isEditing: false
      // })
    }

    senderOrReceiverButton = () => {
      return (
        <button
          className={classnames(
            `event-box__variable`,
            `has-hint`,
            {
              'is-active': this.state.isEditing && this.state.editVariables.includes('senderOrReceiver')
            }
          )}
          onClick={(e) => {
            e.preventDefault()
            this.handleVariables(['senderOrReceiver'])
          }}
        >
          {this.state.event.senderOrReceiver} {/* sent to / received by */}
          {this.state.event.senderAddress} {/* sent to / received by */}
          <span className='hint'>Sender or Receiver</span>
        </button>
      )
    }

    contractAddressButton = () => {
      return (
        <button
          className={classnames(
            `event-box__variable`,
            `has-hint`,
            {
              'is-active': this.state.isEditing && this.state.editVariables.includes('contractAddress')
            }
          )}
          onClick={(e) => {
            e.preventDefault()
            this.handleVariables(['contractAddress'])
          }}
        >
          {this.state.event.contractAddress}
          <span className='hint'>Contract Address</span>
        </button>
      )
    }

    convertTemplate = (template, val) => {
      console.log('template: ', template)
      console.log('val: ', val)
      const replacedText = template.replace(/(\[.*\])*/, val)
      console.log('replacedText: ', replacedText)

      return replacedText
    }

    amountButton = () => {
      return (
        <button
          className={classnames(
            `event-box__variable`,
            `has-hint`,
            {
              'is-active': this.state.isEditing && this.state.editVariables.includes('comparison')
            }
          )}
          onClick={(e) => {
            e.preventDefault()
            this.handleVariables(['comparison', 'amount'])
          }}
        >
          {/* more than 200 */}
          {this.convertTemplate(
            CONSTANTS.en.templates.comparisonsAndAmounts[this.state.event.comparison],
            this.state.event.amount
          )}
          <span className='hint'>Transfer Amount</span>
        </button>
      )
    }

    frequencyButton = () => {
      return (
        <button
          className={classnames(
            `event-box__variable`,
            `has-hint`,
            {
              'is-active': this.state.isEditing && this.state.editVariables.includes('frequency')
            }
          )}
          onClick={(e) => {
            e.preventDefault()
            this.handleVariables(['frequency'])
          }}
        >
          {CONSTANTS.en.templates.frequencies[this.state.event.frequency]}
          <span className='hint'>Freqency</span>
        </button>
      )
    }

    handleVariableChange = (varName, val) => {
      const key = varName === 'variableOne' ?
        this.state.editVariables[0] :
        this.state.editVariables[1]

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

    amountUintInput = () => {
      return (
        <div className='field'>
          <div className='control'>
            <input
              placeholder='Amount in Ether'
              type='number'
              className='input is-small'
              onChange={(e) => {
                this.handleVariableChange('variableTwo', e.target.value)
              }}
              value={this.state.event.amount}
            />
          </div>
        </div>
      )
    }

    gtLtSelect = () => {
      return (
        <div className='field'>
          <div className='control'>
            <div className='select'>
              <select
                value={this.state.event.comparison}
                onChange={(e) => {
                  this.handleVariableChange('variableOne', e.target.value)
                }}
              >
                <option value='gt'>
                  {CONSTANTS.en.formFields.comparisons['gt']}
                </option>
                <option value='lt'>
                  {CONSTANTS.en.formFields.comparisons['lt']}
                </option>
                <option value='eq'>
                  {CONSTANTS.en.formFields.comparisons['eq']}
                </option>
                <option value='gte'>
                  {CONSTANTS.en.formFields.comparisons['gte']}
                </option>
                <option value='lte'>
                  {CONSTANTS.en.formFields.comparisons['lte']}
                </option>
              </select>
            </div>
          </div>
        </div>
      )
    }

    frequencySelect = () => {
      return (
        <div className='field'>
          <div className='control'>
            <div className='select'>
              <select
                value={this.state.event.frequency}
                onChange={(e) => {
                  this.handleVariableChange('variableOne', e.target.value)
                }}
              >
                <option value='everyTime'>
                  {CONSTANTS.en.formFields.frequencies['everyTime']}
                </option>
                <option value='onlyOnce'>
                  {CONSTANTS.en.formFields.frequencies['onlyOnce']}
                </option>
              </select>
            </div>
          </div>
        </div>
      )
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
        colorClass = this.buttonColor(event.id)
        altColorClass = this.buttonColor(event.id + 1)
        // return <Redirect to={routes.DISCOVER_EVENTS} />
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

                    <div className='drawer-inputs'>
                      {this.drawerFormInputs()}
                    </div>

                    <div className='buttons'>
                      <button
                        className='button has-icon has-stroke-red'
                        onClick={this.handleCancelVariable}
                      >
                        <XCircle
                          className='icon__button has-stroke-red'
                        />
                      </button>

                      <button 
                        className='button has-icon has-stroke-green'
                        onClick={this.handleSaveVariable}
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
            className={`drawer__clickbox ${this.state.isEditing ? 'is-active' : null}`}
            onClick={(e) => {
              e.preventDefault()
              this.setState({ isEditing: false })
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
            in={this.state.isEditing}
          >
            {state => variableForm}
          </CSSTransition>

          <section className='section section--main-content pb100'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-sm-8 col-start-sm-3 has-text-centered pb50'>
                  <h4 className='is-size-4 has-text-grey-dark has-text-centered is-uppercase has-text-weight-bold mt20'>
                    {event.name}
                  </h4>
                </div>
              </div>
            </div>

            <div className={`event-box event-box__header ${colorClass}`}>
              <div className={`container-fluid pt50 pb20`}>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12 has-text-centered is-size-4'>
                          {this.frequencyButton()}
                          {this.amountButton()}
                          <span className='event-box__text'>
                            ether's worth of the token at
                          </span>

                          {this.contractAddressButton()}

                          &nbsp;is&nbsp;

                          {this.senderOrReceiverButton()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`event-box event-box__footer ${altColorClass}`}>
              <div className={`container-fluid`}>
                <div className='row'>
                  <div className='col-xs-12'>
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
              </div>
            </div>

            <div className={`event-box event-box__footer is-white-ter pt50`}>
              <div className={`container-fluid`}>
                <div className='row'>
                  <div className='col-xs-12'>
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
              </div>
            </div>
          </section>

          <FooterContainer />
        </div>
      )
    }
  }
)
