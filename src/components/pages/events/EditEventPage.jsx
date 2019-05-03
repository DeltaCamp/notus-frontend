import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import arrayMove from 'array-move'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { formatRoute } from 'react-router-named-routes'
import { orderBy } from 'lodash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { PlusCircle } from 'react-feather'
import { toast } from 'react-toastify'
import { omit } from 'lodash'

import { EditEventButtons } from '~/components/events/EditEventButtons'
import { EventAction } from '~/components/events/EventAction'
import { EventTitle } from '~/components/events/EventTitle'
import { EventMatcher } from '~/components/events/EventMatcher'
import { RunCountTitle } from '~/components/events/RunCountTitle'
import { EventSource } from '~/components/events/EventSource'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { brandColor } from '~/utils/brandColors'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { isValidScopeSource } from '~/utils/isValidScopeSource'
import { showErrorMessage } from '~/utils/showErrorMessage'
import * as routes from '~/../config/routes'

const debug = require('debug')('notus:EditEventPage')

export const EditEventPage = class _EditEventPage extends Component {
  state = {
    event: {
      scope: 0,
      abiEventId: undefined,
      isPublic: false,
      runCount: -1,
      matchers: [
        {
          operand: '0',
          operator: 2,
          order: 1,
          source: 'transaction.value'
        }
      ]
    },
    editMatcherIndex: null,
    editingEventSource: false
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.setState({ freshlyMounted: true })
  }

  handleToggleEventSource = () => {
    this.setState({ editingEventSource: !this.state.editingEventSource })
  }

  scrubEvent(event) {
    return omit(event, '__typename', 'createdAt', 'updatedAt')
  }

  handleSubmitTitle = (newEventTitle) => {
    if (this.isCreateMode()) {
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

  isCreateMode = () => {
    return /events\/new/.test(this.props.location.pathname)
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.eventData && this.props.eventData.event &&
      this.state.freshlyMounted
    ) {
      const event = this.props.eventData.event
      
      let thisEvent
      // only set these if it is a event based off someone's public event
      if (this.isCreateMode()) {
        thisEvent = Object.assign({}, omit(event, ['__typename', 'id', 'matchers', 'isPublic', 'createdAt', 'updatedAt']), {
          parentId: parseInt(event.id, 10),
          id: undefined,
          matchers: event.matchers.map(
            matcher => deepCloneMatcher(matcher, this.isCreateMode())
          ),
          isPublic: false
        })
      } else {
        thisEvent = event
      }

      this.setState({
        event: thisEvent,
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

    if (!this.isCreateMode()) {
      const variables = {
        event: {
          id: this.state.event.id,
          matchers
        }
      }
      const successCallback = ({ data: { updateEvent } }) => {
        toast.success('Updated matcher positions')
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
    let event = { ...this.state.event }

    this.props.createEventMutation({
      variables: {
        event
      },
      refetchQueries: [
        'eventsQuery'
      ]
    }).then((mutationResult) => {
      toast.success('Successfully saved event')
      const eventId = mutationResult.data.createEvent.id
      const newEventLink = formatRoute(routes.EDIT_EVENT, { eventId })

      this.props.history.push(newEventLink)
    }).catch(error => {
      console.error(error)
      showErrorMessage(error)
    })
  }

  handleSetEditMatcher = (editMatcherIndex) => {
    this.setState({
      editMatcherIndex
    })
  }

  handleOnCreateAbi = (abi) => {
    let event = { ...this.state.event }

    if (abi.abiEvents.length) {
      event.abiEventId = parseInt(abi.abiEvents[0].id, 10)
    }

    if (!this.isCreateMode()) {
      const variables = {
        event: this.state.event
      }
      const successCallback = (mutationResult) => {
        toast.success('Updated event scope')
      }
      this.runUpdateEventMutation(variables, successCallback)
    }

    this.handleToggleEventSource()

    this.setState({
      event
    })
  }

  runUpdateEventMutation (variables, successCallback, errorCallback) {
    if (!errorCallback) {
      errorCallback = error => {
        console.error(error)
        showErrorMessage(error)
      }
    }

    debug('runUpdateEventMutation: ', variables)

    this.props.updateEventMutation({
      variables,
      refetchQueries: [
        // only refetch the event we just updated (1 record)
        'eventsQuery'
      ]
    }).then(successCallback).catch(errorCallback)
  }

  handleChangeRunCount = () => {
    this.setState({
      event: {
        ...this.state.event,
        runCount: this.state.event.runCount === 0 ? -1 : 0
      }
    })
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

    if (!this.isCreateMode() && matcher.operand) {
      if (matcher.id) {
        this.props.updateMatcherMutation({
          variables: {
            matcher: matchers[this.state.editMatcherIndex]
          },
          refetchQueries: [
            // only refetch the event or matcher we just updated (1 record)
            'eventsQuery'
          ]
        }).then((mutationResult) => {
          toast.success('Updated event matchers')
        }).catch(error => {
          showErrorMessage(error)
        })
      } else {
        // order is wrong!

        this.props.createMatcherMutation({
          variables: {
            matcher
          },
          refetchQueries: [
            // only refetch the event or matcher we just created (1 record)
            'eventsQuery'
          ]
        }).then((mutationResult) => {
          toast.success('Added new matcher rule')
        }).catch(error => {
          showErrorMessage(error)
        })
      }
    }

    this.handleSetEditMatcher(null)
  }

  onChangeScopeAndAbiEventId = ({ scope, abiEventId }) => {
    const matchers = this.state.event.matchers.map(matcher => {
      let clone = { ...matcher }

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
    }, () => {
      if (!this.isCreateMode()) {
        this.doGenericUpdateEvent()
      }
    })
  }

  handleAddMatcher = () => {
    const newMatcher = {
      operand: '',
      operator: 2,
      order: 1,
      source: 'transaction.value',
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

      if (!this.isCreateMode()) {
        this.props.destroyMatcherMutation({
          variables: {
            id
          },
          refetchQueries: [
            // only refetch the event we just updated (1 record)
            'eventsQuery'
          ]
        }).then((mutationResult) => {
          toast.success('Successfully removed matcher')
        }).catch(error => {
          console.error(error)
          showErrorMessage(error)
        })
      }
    } else {
      toast.error('Each event needs at least one matcher.')
    }
  }

  doGenericUpdateEvent = () => {
    if (this.isCreateMode()) { return }

    let event = { ...this.state.event }

    debug('doGenericUpdateEvent: ', event)

    const variables = {
      event
    }
    const successCallback = ({ data: { updateEvent } }) => {
      toast.success('Updated event')
    }
    this.runUpdateEventMutation(variables, successCallback)
  }

  onChangeWebhookUrl = (webhookUrl) => {
    let event = { ...this.state.event }
    event.webhookUrl = webhookUrl
    this.setState({
      event
    }, this.doGenericUpdateEvent)
  }

  onChangeWebhookBody = (webhookBody) => {
    let event = { ...this.state.event }
    event.webhookBody = webhookBody
    this.setState({
      event
    }, this.doGenericUpdateEvent)
  }

  render () {
    let colorClass = 'is-dark-colored'

    const { eventData } = this.props

    let recipe = {}

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
    const runCountAndScopeSentences = (
      <div className={classnames(
        'event-box__variable-wrapper',
        {
          'matcher-row--is-active': this.state.editingEventSource
        }
      )}>
        <button
          className='event-box__variable'
          onClick={this.handleChangeRunCount}
        >
          <RunCountTitle
            runCount={this.state.event.runCount}
          />
        </button>&nbsp;

        <EventSource
          event={this.state.event}
          onChangeScopeAndAbiEventId={this.onChangeScopeAndAbiEventId}
          onCreateAbi={this.handleOnCreateAbi}
          handleToggleEventSource={this.handleToggleEventSource}
        />
        {this.state.event.abiEventId ? `event ` : ``}
        occurs
      </div>
    )

    const matcherSentences = (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='droppable'>
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
                    draggableId={index + 1}
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
                                key={`event-matcher-${eventMatcher.id || `new-${index}`}`}
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
    )

    return (
      <div className='is-positioned-absolutely'>
        <Helmet
          title='Create New Event'
        />

        <ScrollToTop />

        <section className='section section--main-content'>
          <div className={`container-fluid pb20 ${colorClass} color-block`}>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 has-text-centered is-size-4'>
                  <h6 className='is-size-6 has-text-centered is-uppercase has-text-weight-bold pt30'>
                    {recipe && this.isCreateMode() &&
                      <>
                        Creating a new event{recipe.title ? ` based on "${recipe.title}"` : ''}
                      </>
                    }
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
                    {runCountAndScopeSentences}
                    {matcherSentences}

                    <button
                      className='button has-icon  mt10 pl10 pr10 is-light is-small'
                      onClick={this.handleAddMatcher}
                    >
                      <PlusCircle
                        className='icon__button has-stroke-info'
                      /> &nbsp; Add Matcher
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
                    <EventAction
                      event={this.state.event}
                      webhookUrl={this.state.event.webhookUrl}
                      webhookBody={this.state.event.webhookBody}
                      onChangeWebhookUrl={this.onChangeWebhookUrl}
                      onChangeWebhookBody={this.onChangeWebhookBody}
                      />
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
                    <EditEventButtons
                      {...this.props}
                      eventData={eventData}
                      isCreateMode={this.isCreateMode}
                      isSubmitting={this.state.isSubmitting}
                      handleSaveEvent={this.handleSaveEvent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <EventHistory /> */}
        </section>

        <FooterContainer />
      </div>
    )
  }
}
