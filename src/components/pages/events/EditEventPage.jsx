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
import { updateMatcherMutation } from '~/mutations/updateMatcherMutation'
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
        variables: { id: parseInt(props.match.params.eventId, 10) }
      })
    })(
      graphql(createEventMutation, { name: 'createEventMutation' })(
        graphql(updateEventMutation, { name: 'updateEventMutation' })(
          graphql(updateMatcherMutation, { name: 'updateMatcherMutation' })(
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
                    toast.success('Updated event title!')
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
                    abiEventId,
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

                this.setState({
                  event: {
                    ...this.state.event,
                    matchers
                  }
                })
              }

              handleSaveEvent = (e) => {
                e.preventDefault()

                this.props.createEventMutation({
                  variables: {
                    event: this.state.event
                  },
                  refetchQueries: [
                    'eventsQuery',
                    'publicEventsQuery',
                  ],
                }).then((mutationResult) => {
                  toast.success('Successfully saved event!')
                  const eventId = mutationResult.data.createEvent.id
                  const newEventLink = formatRoute(routes.EVENT, { eventId })

                  this.props.history.push(newEventLink)
                }).catch(error => {
                  console.error(error)
                })
              }

              handleSetEditMatcher = (editMatcherIndex) => {
                this.setState({
                  editMatcherIndex
                })
              }

              // handleCloseMatcherEdit = (e) => {
              //   e.preventDefault()

              //   if (!this.isCreating()) {
              //     this.props.updateMatcherMutation({
              //       variables: {
              //         matcher: this.state.event.matchers[this.state.editMatcherIndex]
              //       },
              //       refetchQueries: [
              //         // only refetch the event or matcher we just created (1 record)
              //         'eventsQuery',
              //         'publicEventsQuery',
              //       ],
              //     }).then((mutationResult) => {
              //       toast.success('Updated event matcher!')
              //     }).catch(error => {
              //       console.error(error)
              //     })
              //   }

              //   this.handleSetEditMatcher(null)
              // }

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
                  }
                }

                this.props.updateEventMutation({
                  variables,
                  refetchQueries: [
                    // only refetch the event we just updated (1 record)
                    'eventsQuery',
                    'publicEventsQuery',
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
                    toast.success('Updated event scope!')
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
                  this.props.updateMatcherMutation({
                    variables: {
                      matcher: matchers[this.state.editMatcherIndex]
                    },
                    refetchQueries: [
                      // only refetch the event or matcher we just created (1 record)
                      'eventsQuery',
                      'publicEventsQuery',
                    ],
                  }).then((mutationResult) => {
                    toast.success('Updated event matcher!')
                  }).catch(error => {
                    console.error(error)
                  })
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
                  operand: "",
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
                      <div className='event-box__variable'>
                        <span className="event-box__text">
                          <FrequencyTitle frequency={this.state.event.frequency} /> <SourceDescription event={this.state.event} /> occurs
                        </span>
                      </div>
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
                                className={classnames(
                                  {
                                    'matcher-row--is-active': index === this.state.editMatcherIndex
                                  }
                                )}
                              >
                                <Draggable
                                  key={`event-matcher-${index}`}
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

                    {/* <EditMatcherDrawer
                      isOpen={this.isEditingMatcher()}
                      matcher={editMatcher}
                      onClose={this.handleCloseMatcherEdit}
                      abiEventId={this.state.event.abiEventId}
                      scope={this.state.event.scope}
                      onChangeMatcher={(updatedMatcher) => this.onChangeMatcher(updatedMatcher)}
                    /> */}

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
                              <div className='col-xs-12 col-xl-12 col-start-xl-2 is-size-4'>
                                {matcherSentences}

                                <button
                                  className='button has-icon has-icon__transparent has-stroke-light is-lowercase has-text-light ml45 mt10'
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
                                    Create Event
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