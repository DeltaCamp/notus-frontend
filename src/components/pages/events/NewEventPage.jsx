import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
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
import { varDescriptionToVarName } from '~/utils/varDescriptionToVarName'
// import { EVENT_TYPES } from '~/../config/eventTypes'
import * as routes from '~/../config/routes'

export const NewEventPage = graphql(saveEventMutation, { name: 'saveEventMutation' })(
  graphql(currentUserQuery, { name: 'currentUserData' })(
    class _NewEventPage extends Component {
      state = {
        event: {},
        editVariable: null
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

      componentDidMount() {
        let colorClass,
          altColorClass

        // const eventTypeId = this.props.match.params.eventTypeId

        // let recipe = EVENT_TYPES.find(
        //   (eventType) => (eventType.id === parseInt(eventTypeId, 10))
        // )

        const newRecipe = {
          frequency: 'default',
          name: 'When this happens trigger that',
          createdAt: null
        }

        // recipe: {
        //   eventTypeId: 12345,
        //     matchers: [
        //       {
        //         variableId: 8756, // var id, var needs to exist beforehand
        //         type: '', // int of enum type,   0 EQ, 1 LT, 2 GT, 3 LTE, 4 GTE
        //         operand: '', // value
        //       }
        //     ],
        //       variables: [],
        //         createdAt: null
        // },

        let recipe = {
          id: 8,
          name: 'ERC20 Token Transfer event',

          frequency: 'default',
          operator: '',
          amount: '0',
          tokenContractAddress: '',
          senderAddress: '',
          recipientAddress: '',
          createdAt: null,

          variables: [
            {
              source: 'transaction.to',
              sourceDataType: 'address',
              description: 'I should be hidden',
              isPublic: false,

            },
            {
              source: 'transaction.to',
              sourceDataType: 'address',
              description: 'Token Contract Address',
              isPublic: true,

            },
            {
              source: 'transaction.from',
              sourceDataType: 'address',
              description: 'Sender Address',
              isPublic: true,

            },
            {
              source: 'log.topic[2]',
              sourceDataType: 'address',
              description: 'Recipient Address',
              isPublic: true,

            },
            {
              source: 'log.topic[3]',
              sourceDataType: 'uint256',
              description: 'Amount',
              isPublic: true,

            }
          ]
        }

        // const event = recipe

        if (!recipe) {
          recipe = newRecipe
        }

        this.setState({
          // event,
          recipe
        })




        if (recipe) {
          colorClass = brandColor(recipe.id)
          altColorClass = altBrandColor(recipe.id + 1)
        } else {
          colorClass = 'is-dark'
          altColorClass = 'is-blue'
        }
       
        this.setState({
          colorClass,
          altColorClass
        })
      }

      handleSaveEvent = (e) => {
        e.preventDefault()
        // console.log('event', this.state.event)

        this.props.saveEventMutation().then(() => {
          // this.closeMobileNav()
          // this.props.history.push(routes.SIGNIN)
          // toast('Successfully signed out. Thanks for using Notus!')
        }).catch(error => {
          console.error(error)
        })
      }

      handleSetEditVariable = (editVariable) => {
        this.setState({
          editVariable
        }, () => { console.log(this.state) })
      }

      handleCancelVariable = (e) => {
        e.preventDefault()

        this.handleSetEditVariable(null)
      }

      handleInputChange = (variable, operatorOrOperand, newValue) => {
        const {
          description,
          sourceDataType
        } = variable

        const name = varDescriptionToVarName(description)

        if (sourceDataType === 'uint256') {
          // note: currently does not handle negative values:
          newValue = newValue.replace(/[^0-9.]/g, '')
        }

        let matcher = this.state[name]
        if (!matcher) {
          matcher = {
            operator: '0',
            operand: newValue
          }
        }

        if (operatorOrOperand === 'operator') {
          matcher.operator = newValue
        } else {
          matcher.operand = newValue
        }

        this.setState({
          [name]: matcher
        }, this.updateEventMatcher(name))
      }

      updateEventMatcher = (key, val) => {
        // console.log("TO IMPLEMENT!")
        
        // this.setState({
        //   event: {
        //     ...this.state.event,
        //     [key]: val
        //   }
        // })

        console.log(this.state)
      }

      isEditing = () => {
        return this.state.editVariable !== null
      }

      render () {
        if (this.state.redirect) {
          return <Redirect to={routes.SIGNIN} />
        }

        if (!this.state.recipe) {
          // SHOW LOADING STATE! or implement new event without recipe
          return null
        }
        

        const variableForm = (
          <>          
            <div className='drawer has-bg__dark'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-8 col-start-sm-3 has-text-centered'>
                    <form className='form mt10 drawer-form'>

                      <EditEventVariableForm
                        editVariable={this.state.editVariable}
                        event={this.state.event}
                        handleInputChange={this.handleInputChange}
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
                this.handleSetEditVariable(null)
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
                      <h6 className='is-size-6 has-text-grey-lighter has-text-centered is-uppercase has-text-weight-bold mt20 pt20 pb20'>
                        {this.state.recipe.name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`event-box event-box__header ${this.state.colorClass}`}>
                <div className={`container-fluid pt20 pb20`}>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-xs-12 col-xl-10 col-start-xl-3 is-size-4'>
                        <EventVariableButton
                          editVariable={this.state.editVariable}
                          state={this.state}
                          handleSetEditVariable={this.handleSetEditVariable}
                          variable={{
                            description: 'Frequency',
                            sourceDataType: 'string',
                            isPublic: true
                          }}
                          isFrequency={true}
                        />

                        <span className="event-box__text">
                          an ERC20 Transfer event occurs
                        </span>

                        {this.state.recipe.variables.map((variable, index) => {
                          return (
                            <EventVariableButton
                              isFirst={index === 1}
                              key={`readable-variable-${index}`}
                              editVariable={this.state.editVariable}
                              state={this.state}
                              handleSetEditVariable={this.handleSetEditVariable}
                              variable={variable}
                            />
                          )
                        })}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`event-box event-box__footer ${this.state.altColorClass}`}>
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