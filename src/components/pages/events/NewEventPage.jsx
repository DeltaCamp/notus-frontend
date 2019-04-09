import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classnames from 'classnames'
import { CheckCircle } from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { rollbar } from '~/../config/rollbar'
import { EVENT_TYPES } from '~/../config/eventTypes'
import * as routes from '~/../config/routes'
import * as CONSTANTS from '~/constants'

export const NewEventPage = graphql(currentUserQuery, { name: 'currentUserData' })(
  class _NewEventPage extends PureComponent {
    state = {
      event: {
        frequency: 'default',
        comparison: 'default',
        amount: '0',
        contractAddress: '',
        sentToOrReceivedBy: 'default',
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
        const selectOptions = [
          { value: 'everyTime', text: CONSTANTS.en.formFields.frequencies['everyTime'] },
          { value: 'onlyOnce', text: CONSTANTS.en.formFields.frequencies['onlyOnce'] }
        ]

        inputs = this.selectDropdown('frequency', 'variableOne', 'string', selectOptions)
      } else if (this.state.editVariables.includes('amount')) {
        const selectOptions = [
          { value: 'gt', text: CONSTANTS.en.formFields.comparisons['gt'] },
          { value: 'lt', text: CONSTANTS.en.formFields.comparisons['lt'] },
          { value: 'eq', text: CONSTANTS.en.formFields.comparisons['eq'] },
          { value: 'gte', text: CONSTANTS.en.formFields.comparisons['gte'] },
          { value: 'lte', text: CONSTANTS.en.formFields.comparisons['lte'] }
        ]

        inputs = <>
          {this.selectDropdown('comparison', 'variableOne', 'string', selectOptions)}
          {this.textInput('amount', 'variableTwo', 'decimal')}
        </>
      } else if (this.state.editVariables.includes('contractAddress')) {
        inputs = this.textInput('contractAddress', 'variableOne', 'string')
      } else if (this.state.editVariables.includes('sentToOrReceivedBy')) {
        const selectOptions = [
          { value: 'sentTo', text: CONSTANTS.en.formFields.sentToOrReceivedBy['sentTo'] },
          { value: 'receivedBy', text: CONSTANTS.en.formFields.sentToOrReceivedBy['receivedBy'] }
        ]

        const isHidden = (
          this.state.event.sentToOrReceivedBy === 'receivedBy'
        )
        
        inputs = <>
          {this.selectDropdown('sentToOrReceivedBy', 'variableOne', 'string', selectOptions)}
          {this.textInput('senderAddress', 'variableTwo', 'string', { hidden: isHidden })}
          {this.textInput('recipientAddress', 'variableThree', 'string', { hidden: !isHidden })}
        </>
      } else if (!this.state.editVariables.length) {
        inputs = null
      } else {
        inputs = null
        rollbar.error(
          `drawerFormInputs() called with ${this.state.editVariables.toString()}: no matching variable type!`
        )
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

    senderOrRecipientButton = () => {
      return (
        <button
          className={classnames(
            `event-box__variable`,
            `has-hint`,
            {
              'is-active': this.state.isEditing && this.state.editVariables.includes('sentToOrReceivedBy')
            }
          )}
          onClick={(e) => {
            e.preventDefault()
            this.handleVariables(['sentToOrReceivedBy', 'senderAddress', 'recipientAddress'])
          }}
        >
          <span className='event-box__variable-value'>
            {
              this.state.event.sentToOrReceivedBy === 'default'
                ? CONSTANTS.en.templates.sentToOrReceivedBy['default']
                : this.convertTemplate(
                  CONSTANTS.en.templates.sentToOrReceivedBy[this.state.event.sentToOrReceivedBy],
                  this.state.event.senderAddress
                )
                
          }
        {/* this.state.event.recipientAddress */}
          </span>
          <span className='hint'>Sender or Recipient</span>
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
          <span className='event-box__variable-value'>
            {this.state.event.contractAddress === ''
              ? '[address]'
              : this.state.event.contractAddress}
          </span>
          <span className='hint'>Contract Address</span>
        </button>
      )
    }

    convertTemplate = (template, val) => {
      const replacedText = template.replace(/(\[.*\])/, val)

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
          <span className='event-box__variable-value'>
            {this.convertTemplate(
              CONSTANTS.en.templates.comparisonsAndAmounts[this.state.event.comparison],
              this.state.event.amount
            )}
          </span>
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
          <span className='event-box__variable-value'>
            {CONSTANTS.en.templates.frequencies[this.state.event.frequency]}
          </span>
          <span className='hint'>Freqency</span>
        </button>
      )
    }

    handleVariableChange = (varName, type, val) => {
      let key = this.state.editVariables[0]

      if (varName === 'variableTwo') {
        key = this.state.editVariables[1]
      } else if (varName === 'variableThree') {
        key = this.state.editVariables[2]
      }
      // const key = varName === 'variableOne'
      //   ? this.state.editVariables[0]
      //   : this.state.editVariables[1]

      // console.log(varName, type, val, key)

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

    textInput = (variableName, variableNumber, variableType, options = {}) => {
      return (
        <div className='field' style={{ display: options.hidden ? 'none' : 'block' }}>
          <div className='control'>
            <input
              autoFocus={(variableNumber === 'variableOne')}
              placeholder={CONSTANTS.en.placeholders[variableName]}
              className='input is-small'
              onClick={(e) => {
                e.target.setSelectionRange(0, e.target.value.length)
              }}
              onChange={(e) => {
                this.handleVariableChange(variableNumber, variableType, e.target.value)
              }}
              value={this.state.event[variableName]}
            />
          </div>
        </div>
      )
    }

    selectDropdown = (variableName, variableNumber, variableType, selectOptions) => {
      const callback = (e) => {
        this.handleVariableChange(variableNumber, variableType, e.target.value)
      }

      return (
        <div className='field'>
          <div className='control'>
            <div className='select'>
              <select
                value={this.state.event[variableName]} 
                onFocus={(e) => {
                  callback(e)
                }}
                onChange={(e) => {
                  callback(e)
                }}
              >
                {selectOptions.map((option, index) => (
                  <option
                    key={`${variableName}-options-${index}`}
                    value={option.value}
                  >
                    {option.text}
                  </option>
                ))}
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
                      {/* <button
                        className='button has-icon has-stroke-red'
                        onClick={this.handleCancelVariable}
                      >
                        <XCircle
                          className='icon__button has-stroke-red'
                        />
                      </button> */}

                      {/* <button 
                        className='button has-icon has-stroke-green'
                        onClick={this.handleSaveVariable}
                      >
                        <CheckCircle
                          className='icon__button has-stroke-green'
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
            <div className=''>
              <div className={`container-fluid pb20 is-dark`}>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12 has-text-centered is-size-4'>
                        {/* <div className='col-xs-12 col-sm-8 col-start-sm-3 has-text-centered'> */}
                          <h6 className='is-size-6 has-text-grey-lighter has-text-centered is-uppercase has-text-weight-bold mt20'>
                            {event.name}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`event-box event-box__header ${colorClass}`}>
              <div className={`container-fluid pt50 pb20`}>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12 col-xl-10 col-start-xl-2 has-text-centered is-size-4'>
                          {this.frequencyButton()}
                          {this.amountButton()}
                          <span className='event-box__text'>
                            ether's worth of the token at
                          </span>

                          {this.contractAddressButton()}

                          &nbsp;is&nbsp;

                          {this.senderOrRecipientButton()}
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

            <div className={`is-white-ter pt30 pb30`}>
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
