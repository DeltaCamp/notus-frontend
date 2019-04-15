import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import cloneDeep from 'clone-deep'
import { orderBy } from 'lodash'
import { CheckCircle, PlusCircle } from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { EditEventVariableForm } from '~/components/events/EditEventVariableForm'
import { EventMatcherSentence } from '~/components/events/EventMatcherSentence'
import { MatcherForm } from '~/components/recipes/MatcherForm'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { createEventMutation } from '~/mutations/createEventMutation'
import { currentUserQuery } from '~/queries/currentUserQuery'
import { eventQuery } from '~/queries/eventQuery'
import { altBrandColor, brandColor } from '~/utils/brandColors'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
// import { RECIPES } from '~/../config/recipes'
import * as routes from '~/../config/routes'

export const NewEventPage = 
  graphql(currentUserQuery, { name: 'currentUserData' })(
    graphql(eventQuery, {
      name: 'eventData',
      skip: (props) => !props.match.params.parentEventId,
      options: (props) => ({
        variables: { id: parseInt(props.match.params.parentEventId, 10) }
      })
    })(
      graphql(createEventMutation, { name: 'createEventMutation' })(
        class _NewEventPage extends Component {
          state = {
            event: {
              frequency: '-1',
              matchers: [
                {
                  operand: "",
                  operandDataType: 1,
                  operator: 2,
                  order: 1,
                  source: "transaction.value"
                }
              ]
            },
            editMatcherIndex: null,
            newEventTitle: ''
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

          generateTitle = () => {
            const matcherTitle = this.state.event.matchers.map((matcher) => {
              return `${matcher.source} is ${matcher.operand} and `
            })
            return `${this.state.event.title} where ${matcherTitle}`
          }

          handleSaveEvent = (e) => {
            e.preventDefault()

            this.props.createEventMutation({
              variables: {
                event: {
                  ...this.state.event,
                  title: this.state.newEventTitle || this.generateTitle()
                }
              }
            }).then(() => {
              toast.success('Successfully saved event!')
            }).catch(error => {
              console.error(error)
            })
          }

          handleSetEditMatcher = (editMatcherIndex) => {
            this.setState({
              editMatcherIndex
            })
          }

          handleCancelEditingMatcher = (e) => {
            e.preventDefault()

            this.handleSetEditMatcher(null)
          }

          // handleInputChange = (variable, typeOrOperand, newValue) => {
          //   const {
          //     description,
          //     sourceDataType
          //   } = variable

          //   const name = varDescriptionToVarName(description)

          //   if (sourceDataType === 'uint256') {
          //     // note: currently does not handle negative values:
          //     newValue = newValue.replace(/[^0-9.]/g, '')
          //   }

          //   let matcher = this.state.event.matchers.find((matcher) => (
          //     matcher.variableId === variable.id
          //   ))

          //   if (!matcher) {
          //     console.log('no matcher yet, creating one with variableId: ', variable.id)
          //     matcher = {
          //       variableId: variable.id,
          //       type: '0',
          //       operand: newValue
          //     }
          //   }

          //   if (typeOrOperand === 'type') {
          //     matcher.type = newValue
          //   } else {
          //     matcher.operand = newValue
          //   }

          //   this.setState({
          //     [name]: matcher
          //   }, this.updateEventMatcher(variable, matcher))
          // }

          // updateEventMatcher = (variable, matcher) => {
          //   const matchers = this.state.event.matchers

          //   let existingMatcher = this.state.event.matchers.find((matcher) => (
          //     matcher.variableId === variable.id
          //   ))

          //   if (!existingMatcher) {
          //     matchers.push(matcher)
          //   } else {
          //     const matcherIndex = this.state.event.matchers.indexOf(existingMatcher)
          //     matchers[matcherIndex].operand = matcher.operand
          //   }
            
          //   this.setState({
          //     event: {
          //       ...this.state.event,
          //       matchers
          //     }
          //   }, () => { console.log(this.state.event)})
          // }

          isEditing = () => {
            return this.state.editMatcherIndex !== null
          }

          recipeSentence = (recipe) => {
            const firstLetter = recipe.title.charAt(0)
            const startsWithVowel = /[aeiou]/i.test(firstLetter)

            return startsWithVowel ? `an ${recipe.title}` : `a ${recipe.title}`
          }

          onChangeMatcher = (matcher) => {
            const matchers = this.state.event.matchers.slice()
            matchers[this.state.editMatcherIndex] = matcher

            this.setState({
              event: {
                ...this.state.event,
                matchers
              }
            })
          }

          componentDidUpdate(prevProps) {
            let recipe 
            
            if (
              prevProps.eventData
              && (prevProps.eventData.event !== this.props.eventData.event)
            ) {
              recipe = this.props.eventData.event

              // const matchers = cloneDeep(recipe.matchers)
              const matchers = recipe.matchers.map(matcher => deepCloneMatcher(matcher))

              const event = {
                isPublic: false,
                matchers: orderBy(matchers, 'order'),
                parentId: parseInt(recipe.id, 10),
                title: recipe.title
              }
              
              this.setState({
                event
              })
            }
          }

          handleAddMatcher = () => {
            const newMatcher = {
              operand: "",
              operandDataType: 1,
              operator: 2,
              order: 1,
              source: "transaction.value"
            }

            this.setState({
              event: {
                ...this.state.event,
                matchers: this.state.event.matchers.concat(newMatcher)
              }
            })
          }

          handleRemoveMatcher = (matcherIndex) => {
            const matchers = this.state.event.matchers

            if (matchers.length > 1) {
              matchers.splice(matcherIndex, 1)

              this.setState({
                event: {
                  ...this.state.event,
                  matchers
                }
              })
            } else {
              toast.error('Each event needs at least one matcher.')
            }
          }
          
          render () {
            let colorClass = 'is-dark'
            let altColorClass = 'is-blue'
            let variableForm = null

            const editMatcher = this.isEditing()
              ? this.state.event.matchers[this.state.editMatcherIndex]
              : null

            let recipe = {
              title: 'New Event',
              description: 'event matching the following'
            }

            if (this.state.redirect) {
              return <Redirect to={routes.SIGNIN} />
            }

            if (this.props.eventData) {
              if (this.props.eventData.loading) {
                return null
              } else {
                if (this.props.eventData.error) {
                  console.warn(this.props.eventData.error)
                  return null
                } else {
                  recipe = this.props.eventData.event

                  if (recipe) {
                    colorClass = brandColor(recipe.id)
                    altColorClass = altBrandColor(recipe.id + 1)
                  }
                }
              }
            }


            if (editMatcher) {
              variableForm = (
                <>          
                  <div className='drawer has-bg__dark'>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12 col-sm-8 col-start-sm-3 has-text-centered'>
                          <form className='form mt10 drawer-form'>
                            <MatcherForm
                              key={`matcher-${this.state.matcherIndex}`}
                              matcher={editMatcher}
                              onChange={
                                (updatedMatcher) => this.onChangeMatcher(updatedMatcher)
                              }
                            />
                            {/* <EditEventVariableForm */}

                            <div className='buttons'>
                              <button
                                className='button has-icon has-stroke-green'
                                onClick={this.handleCancelEditingMatcher}
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
                      this.handleCancelEditingMatcher(e)
                    }}
                  />
                </>
              )
            }

            const frequencyWord = (this.state.event.frequency === '-1') ? 'Every time' : 'Only once'

            const matcherSentences = (
              <>
                <span className="event-box__text">
                  {frequencyWord} {this.recipeSentence(recipe)} occurs
                </span>
                {this.state.event.matchers.map((eventMatcher, index) => (
                  <EventMatcherSentence
                    key={`event-matcher-sentence-${index}`}
                    matcher={eventMatcher}
                    index={index}
                    state={this.state}
                    handleSetEditMatcher={this.handleSetEditMatcher}
                    handleRemoveMatcher={this.handleRemoveMatcher}
                    isFirst={index === 0}
                    isActive={editMatcher && eventMatcher === editMatcher}
                  />
                ))}
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
                            {recipe.title}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`event-box event-box__header ${colorClass}`}>
                    <div className={`container-fluid pt20 pb20`}>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-xs-12 col-xl-12 col-start-xl-2 is-size-4'>
                            {matcherSentences}

                            <br />
                            <button
                              className='button has-icon has-icon__transparent has-stroke-light is-lowercase has-text-light'
                              onClick={this.handleAddMatcher}
                            >
                              <PlusCircle
                                className='icon__button has-stroke-light'
                              /> &nbsp; add matcher
                            </button>
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
                            ... then send me an email&nbsp;
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
  )