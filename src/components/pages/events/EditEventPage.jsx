import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import arrayMove from 'array-move'
import ReactTimeout from 'react-timeout'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { formatRoute } from 'react-router-named-routes'
import { orderBy } from 'lodash'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { PlusCircle } from 'react-feather'
import { toast } from 'react-toastify'
import { graphql } from 'react-apollo'

import { EditEventDrawer } from '~/components/EditEventDrawer'
import { EventAction } from '~/components/events/EventAction'
import { EventTitle } from '~/components/events/EventTitle'
import { EventMatcher } from '~/components/events/EventMatcher'
import { FrequencyTitle } from '~/components/events/FrequencyTitle'
import { SourceDescription } from '~/components/events/SourceDescription'
import { FooterContainer } from '~/components/layout/Footer'
import { IsAuthed } from '~/components/IsAuthed'
import { ScrollToTop } from '~/components/ScrollToTop'
import { createEventMutation } from '~/mutations/createEventMutation'
import { updateEventMutation } from '~/mutations/updateEventMutation'
import { createMatcherMutation } from '~/mutations/createMatcherMutation'
import { updateMatcherMutation } from '~/mutations/updateMatcherMutation'
import { destroyMatcherMutation } from '~/mutations/destroyMatcherMutation'
import { eventQuery } from '~/queries/eventQuery'
import { brandColor } from '~/utils/brandColors'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { isValidScopeSource } from '~/utils/isValidScopeSource'
import * as routes from '~/../config/routes'

export const EditEventPage = 
  IsAuthed(
    graphql(eventQuery, {
      name: 'eventData',
      skip: (props) => !props.match.params.eventId,
      options: (props) => ({
        fetchPolicy: 'cache-and-network',
        variables: { id: parseInt(props.match.params.eventId, 10) }
      })
    })(
      graphql(createEventMutation, { name: 'createEventMutation' })(
      graphql(updateEventMutation, { name: 'updateEventMutation' })(
      graphql(createMatcherMutation, { name: 'createMatcherMutation' })(
      graphql(updateMatcherMutation, { name: 'updateMatcherMutation' })(
      graphql(destroyMatcherMutation, { name: 'destroyMatcherMutation' })(
        ReactTimeout(class _EditEventPage extends Component {
          state = {
            event: {
              scope: 0,
              abiEventId: undefined,
              isPublic: false,
              // frequency: '-1',
              matchers: [
                {
                  operand: "",
                  operator: 2,
                  order: 1,
                  source: "transaction.value"
                }
              ]
            },
            editMatcherIndex: null,
            showEventForm: false,
          }

          static propTypes = {
            match: PropTypes.object.isRequired
          }

          static contextTypes = {
            router: PropTypes.object.isRequired
          }

          componentDidMount() {
            this.setState({ freshlyMounted: true })
          }

          handleSubmitTitle = (newEventTitle) => {
            if (this.isCreating()) {
              this.setState({
                event: {
                  ...this.state.event,
                  title: newEventTitle
                }
              })
            } else {
              const variables = {
                event: {
                  id: this.state.event.id,
                  title: newEventTitle
                }
              }
              const successCallback = ({ data: { updateEvent } }) => {
                this.setState({
                  event: {
                    ...this.state.event,
                    ...updateEvent
                  }
                })
                toast.success('Updated event title')
              }
              this.runUpdateEventMutation(variables, successCallback)
            }
          }

          isCreating = () => {
            return /events\/new/.test(this.props.location.pathname)
          }

          componentDidUpdate(prevProps) {
            if (
              this.props.eventData && this.props.eventData.event
              && this.state.freshlyMounted
            ) {
              const event = this.props.eventData.event
              let {
                id,
                parentId,
                isPublic,
                scope,
                abiEventId,
                title
              } = event

              const matchers = event.matchers.map(
                matcher => deepCloneMatcher(matcher, this.isCreating())
              )

              // only set these if it is a event based off someone's public event
              if (this.isCreating()) {
                parentId = parseInt(event.id, 10)
                isPublic = false
                id = undefined
                title = event.title
              }

              const newEventObject = {
                ...this.state.event,
                id,
                parentId,
                isPublic,
                scope,
                abiEventId: abiEventId || undefined,
                title,
                matchers: orderBy(matchers, 'order')
              }

              this.setState({
                event: newEventObject,
                freshlyMounted: false
              })
            }
          }

          onDragEnd = (result) => {
            // dropped outside the list
            if (!result.destination) {
              return
            }

            const matchers = arrayMove(
              this.state.event.matchers,
              result.source.index,
              result.destination.index
            )

            matchers.forEach((matcher, index) => {
              matcher.order = index
            })

            this.setState({
              event: {
                ...this.state.event,
                matchers
              }
            })

            if (!this.isCreating()) {
              const variables = {
                event: {
                  id: this.state.event.id,
                  matchers
                }
              }
              const successCallback = ({ data: { updateEvent } }) => {
                toast.success('Updated rule matcher positions')
              }
              // const errorCallback = ({ data: { updateEvent } }) => {
                // TODO: implement fail state and reverse position of matchers!
              // }
              this.runUpdateEventMutation(variables, successCallback)
            }
          }

          handleSaveEvent = (e) => {
            e.preventDefault()

            const { matchers } = this.state.event

            matchers.forEach((matcher, index) => {
              matcher.order = index
            })

            this.setState({
              event: {
                ...this.state.event,
                matchers
              }
            }, this.doCreate)
          }

          doCreate = () => {
            this.props.createEventMutation({
              variables: {
                event: this.state.event
              },
              refetchQueries: [
                'eventsQuery',
              ],
            }).then((mutationResult) => {
              toast.success('Successfully saved event')
              const eventId = mutationResult.data.createEvent.id
              const newEventLink = formatRoute(routes.EVENT, { eventId })

              this.props.history.push(newEventLink)
            }).catch(error => {
              console.error(error)
              toast.error(error.message)
            })
          }

          handleSetEditMatcher = (editMatcherIndex) => {
            this.setState({
              editMatcherIndex
            })
          }

          handleOnCreateAbi = (abi) => {
            let event = {...this.state.event}
            if (abi.abiEvents.length) {
              event.abiEventId = abi.abiEvents[0].id
            }
            
            this.setState({
              event
            })
          }

          showEventForm = () => {
            this.setState({ showEventForm: true })
          }

          runUpdateEventMutation(variables, successCallback, errorCallback) {
            if (!errorCallback) {
              errorCallback = error => {
                console.error(error)
                toast.error(error.message)
              }
            }

            this.props.updateEventMutation({
              variables,
              refetchQueries: [
                // only refetch the event we just updated (1 record)
                'eventsQuery',
              ],
            }).then(successCallback).catch(errorCallback)
          }

          handleHideEventForm = (e) => {
            e.preventDefault()

            if (!this.isCreating()) {
              const variables = {
                event: this.state.event
              }
              const successCallback = (mutationResult) => {
                toast.success('Updated event scope')
              }
              this.runUpdateEventMutation(variables, successCallback)
            }

            this.setState({ showEventForm: false })
          }

          isEditingMatcher = () => {
            return this.state.editMatcherIndex !== null
          }

          recipeSentence = (title) => {
            if (!title) { return '' }
            const firstLetter = title.charAt(0)
            const startsWithVowel = /[aeiou]/i.test(firstLetter)

            return startsWithVowel ? `an ${title}` : `a ${title}`
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

            if (!this.isCreating()) {
              if (matcher.id) {
                this.props.updateMatcherMutation({
                  variables: {
                    matcher: matchers[this.state.editMatcherIndex]
                  },
                  refetchQueries: [
                    // only refetch the event or matcher we just updated (1 record)
                    'eventsQuery',
                    'eventsQuery',
                  ],
                }).then((mutationResult) => {
                  toast.success('Updated event matchers')
                }).catch(error => {
                  toast.error(error.message)
                })
              } else {
                console.log(matcher)
                // order is wrong!
                
                this.props.createMatcherMutation({
                  variables: {
                    matcher
                  },
                  refetchQueries: [
                    // only refetch the event or matcher we just created (1 record)
                    'eventsQuery',
                    'eventsQuery',
                  ],
                }).then((mutationResult) => {
                  toast.success('Added new matcher rule')
                }).catch(error => {
                  toast.error(error.message)
                })
              }
            }

            this.handleSetEditMatcher(null)
          }

          onChangeScopeAndAbiEventId = ({ scope, abiEventId }) => {
            const matchers = this.state.event.matchers.map(matcher => {
              let clone = {...matcher}

              if (!isValidScopeSource(scope, matcher.source)) {
                clone.source = 'block.number'
              }

              return clone
            })

            this.setState({
              event: {
                ...this.state.event,
                matchers,
                scope,
                abiEventId: parseInt(abiEventId, 10)
              }
            })
          }

          handleAddMatcher = () => {
            const newMatcher = {
              operand: '',
              operator: 2,
              order: 1,
              source: "transaction.value",
              eventId: parseInt(this.state.event.id, 10) || undefined
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
            const id = parseInt(matchers[matcherIndex].id, 10)

            if (matchers.length > 1) {
              matchers.splice(matcherIndex, 1)

              // matchers.forEach((matcher, index) => {
              //   matcher.order = index
              // })

              this.setState({
                event: {
                  ...this.state.event,
                  matchers
                }
              })

              if (!this.isCreating()) {
                this.props.destroyMatcherMutation({
                  variables: {
                    id
                  },
                  refetchQueries: [
                    // only refetch the event we just updated (1 record)
                    'eventsQuery',
                  ],
                }).then((mutationResult) => {
                  toast.success('Successfully removed rule matcher')
                }).catch(error => {
                  console.error(error)
                  toast.error(error.message)
                })
              }
            } else {
              toast.error('Each event needs at least one matcher.')
            }
          }

          doGenericUpdateEvent = () => {
            const variables = {
              event: this.state.event
            }
            const successCallback = ({ data: { updateEvent } }) => {
              toast.success('Updated event')
            }
            this.runUpdateEventMutation(variables, successCallback)
          }
          
          render () {
            let colorClass = 'is-dark-colored'

            const { eventData } = this.props

            // const editMatcher = this.isEditingMatcher()
            //   ? this.state.event.matchers[this.state.editMatcherIndex]
            //   : null

            let recipe = {
            }

            if (eventData) {
              if (eventData.loading) {
                return null
              } else {
                if (eventData.error) {
                  console.warn(eventData.error)
                  return null
                } else {
                  recipe = eventData.event

                  if (recipe) {
                    colorClass = brandColor(recipe.id)
                  }
                }
              }
            }

            const matcherSentences = (
              <>
                <div className='event-box__variable-wrapper' onClick={this.showEventForm}>
                  <button className='event-box__variable'>
                    <FrequencyTitle frequency={this.state.event.frequency} />
                  </button>

                  <button className='event-box__variable'>
                    <SourceDescription event={this.state.event} />
                  </button>
                  occurs
                </div>


                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {this.state.event.matchers.map((eventMatcher, index) => (
                          <div
                            key={`event-matcher-${index}`}
                            className={classnames(
                              {
                                'matcher-row--is-active': index === this.state.editMatcherIndex
                              }
                            )}
                          >
                            <Draggable
                              key={`event-matcher-draggable-${index}`}
                              draggableId={index+1}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <TransitionGroup>
                                  <CSSTransition
                                    key={`event-matcher-css-transition-${index}`}
                                    timeout={{ enter: 150, exit: 1000 }}
                                    classNames='fade'
                                    appear
                                  >
                                    <div className='fade-enter'>
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <EventMatcher
                                          key={`event-matcher-${index}`}
                                          isFirst={index === 0}
                                          index={index}
                                          handleSetEditMatcher={this.handleSetEditMatcher}
                                          handleRemoveMatcher={this.handleRemoveMatcher}
                                          matcher={eventMatcher}
                                          event={this.state.event}
                                          onChangeMatcher={
                                            (updatedMatcher) => this.onChangeMatcher(updatedMatcher)
                                          }
                                        />
                                        {/* editMatcher={editMatcher} */}
                                      </div>
                                    </div>
                                  </CSSTransition>
                                </TransitionGroup>
                              )}
                            </Draggable>
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            )

            return (
              <div className='is-positioned-absolutely'>
                <Helmet
                  title='Create New Event'
                />

                <ScrollToTop />

                <EditEventDrawer
                  event={this.state.event}
                  onChangeScopeAndAbiEventId={this.onChangeScopeAndAbiEventId}
                  onCreateAbi={this.handleOnCreateAbi}
                  isOpen={this.state.showEventForm}
                  onClose={this.handleHideEventForm}
                />

                <section className='section section--main-content'>
                  <div className={`container-fluid pb20 ${colorClass} color-block`}>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-xs-12 has-text-centered is-size-4'>
                          <h6 className='is-size-6 has-text-centered is-uppercase has-text-weight-bold pt30'>
                            <EventTitle
                              event={this.state.event}
                              handleSubmitTitle={this.handleSubmitTitle}
                            />
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`event-box event-box__header color-block ${colorClass} is-top-layer`}>
                    <div className='is-brightness-70 is-full-width-background' />

                    <div className={`container-fluid pt20 pb20`}>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-xs-12 col-xl-10 col-start-xl-2 is-size-4'>
                            {matcherSentences}

                            <button
                              className='button has-icon  mt10 pl10 pr10 is-link'
                              onClick={this.handleAddMatcher}
                            >
                              <PlusCircle
                                className='icon__button has-stroke-light'
                              /> &nbsp; Add New Rule
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`event-box event-box__footer color-block ${colorClass}`}>
                    <div className='is-brightness-40 is-full-width-background' />

                    <div className={`container-fluid`}>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-xs-12 has-text-centered is-size-4'>
                            <EventAction />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {this.isCreating() && (
                    <div className={`is-white-ter pt30 pb30`}>
                      <div className={`container-fluid`}>
                        <div className='container'>
                          <div className='row'>
                            <div className='col-xs-12 has-text-centered is-size-4'>
                              <button
                                onClick={this.handleSaveEvent}
                                className='button is-success'
                                disabled={this.state.isCreating}
                              >
                                <PlusCircle />&nbsp;Create Event
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                <FooterContainer />
              </div>
            )
          }
        })
    )
    )
    )
    )
    )
  )
)