import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import arrayMove from 'array-move'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { formatRoute } from 'react-router-named-routes'
import { Redirect } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus } from 'react-feather'
import { sample, omit } from 'lodash'

import { ActiveButton } from '~/components/events/ActiveButton'
import { PublishButton } from '~/components/events/PublishButton'
import { EditEventButtons } from '~/components/events/EditEventButtons'
import { EventAction } from '~/components/events/EventAction'
import { EventTitle } from '~/components/events/EventTitle'
import { EventMatcher } from '~/components/events/EventMatcher'
import { RunCountTitle } from '~/components/events/RunCountTitle'
import { EventSource } from '~/components/events/EventSource'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { isValidScopeSource } from '~/utils/isValidScopeSource'
import { notusToast } from '~/utils/notusToast'
import { showErrorMessage } from '~/utils/showErrorMessage'
import * as routes from '~/../config/routes'
// import { SCOPES } from '~/constants'

const debug = require('debug')('notus:EditEventPage')

const randomColor = () => {
  return sample([
    '#201334', // dark purple
    '#0b603a', // forest green
    '#06368b', // dark blue
    '#dd5500', // orange
    '#0676cb', // light blue
    '#6e0ad3', // purple
    '#cd0720', // red
    '#181818', // black
    '#2f2d29', // grey
  ])
}

export const EditEventPage = class _EditEventPage extends Component {
  state = {
    event: {
      color: randomColor(),
      scope: 0,
      abiEventId: undefined,
      isPublic: false,
      sendEmail: true,
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

  eventEntityToDto(event) {
    event = this.scrubEvent(event)
    event.abiEventId = parseInt(event.abiEventId, 10)
    if (event.matchers) {
      event.matchers = event.matchers.map(matcher => this.matcherEntityToDto(matcher))
    }
    return event
  }

  matcherEntityToDto(matcher) {
    return deepCloneMatcher(matcher)
  }

  scrubEvent(event) {
    return omit(event, '__typename', 'createdAt', 'updatedAt', 'parent', 'user')
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
        notusToast.success('Updated event title')
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
        const filteredEvent = omit(event, [
          '__typename',
          'id',
          'matchers',
          'isPublic',
          'createdAt',
          'updatedAt'
        ])
        thisEvent = Object.assign({}, filteredEvent, {
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
    }, () => {
      this.doGenericUpdateEvent({
        id: this.state.event.id,
        matchers
      }, 'Updated matcher positions')
    })
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
      notusToast.success('Successfully saved event')
      // const eventId = mutationResult.data.createEvent.id
      const newEventLink = formatRoute(routes.MY_EVENTS)

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

  runUpdateEventMutation (variables, successCallback, errorCallback) {
    if (!errorCallback) {
      errorCallback = error => {
        console.error(error)
        showErrorMessage(error)
      }
    }

    debug('runUpdateEventMutation: ', variables)

    return this.props.updateEventMutation({
      variables,
      refetchQueries: [
        // only refetch the event we just updated (1 record)
        'eventsQuery'
      ]
    }).then(successCallback).catch(errorCallback)
  }

  handleChangeRunCount = () => {
    const runCount = this.state.event.runCount === 0 ? -1 : 0
    const event = {
      ...this.state.event,
      runCount
    }
    this.setState({
      event
    }, () => {
      this.doGenericUpdateEvent({id: event.id, runCount }, `Event will run ${RunCountTitle(runCount).toLowerCase()}`)
    })
  }

  handleToggleActive = () => {
    const isActive = !this.state.event.isActive
    const event = {
      ...this.state.event,
      isActive
    }
    this.setState({
      event
    }, () => {
      this.doGenericUpdateEvent({id: event.id, isActive }, `Event ${isActive ? 'is active' : 'no longer active'}`)
    })
  }

  handleTogglePublish = () => {
    const isPublic = !this.state.event.isPublic
    const event = {
      ...this.state.event,
      isPublic
    }
    this.setState({
      event
    }, () => {
      this.doGenericUpdateEvent(event, `Event is ${isPublic ? 'public' : 'no longer public'}`)
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
          notusToast.success('Updated event matchers')
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
          notusToast.success('Added new matcher rule')
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
        // clear out operand stuff
      }

      return clone
    })

    console.warn('WANTING TO UPDATE MATCHERS! deepClone?', matchers)

    this.setState({
      event: {
        ...this.state.event,
        matchers,
        scope,
        abiEventId: parseInt(abiEventId, 10)
      }
    }, () => {
      if (!this.isCreateMode()) {
        this.doGenericUpdateEvent({
          id: this.state.event.id,
          matchers,
          scope,
          abiEventId
        })
      }
    })
  }

  onChangeAbiEventId = ({ abiEvent }) => {
    const matchers = this.state.event.matchers.map(matcher => {
      let clone = { ...matcher }

      if (!isValidMatcherForAbiEvent(abiEvent, matcher.source)) {
        clone.source = 'transaction.value'
        // clear out operand stuff
      }

      return clone
    })

    this.setState({
      event: {
        ...this.state.event,
        matchers,
        abiEventId: parseInt(abiEvent.id, 10)
      }
    }, () => {
      if (!this.isCreateMode()) {
        this.doGenericUpdateEvent({
          id: this.state.event.id,
          abiEventId: parseInt(abiEvent.id, 10)
        })
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
    const id = matchers[matcherIndex].id ? parseInt(matchers[matcherIndex].id, 10) : undefined

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

      if (!this.isCreateMode() && id) {
        this.props.destroyMatcherMutation({
          variables: {
            id
          },
          refetchQueries: [
            // only refetch the event we just updated (1 record)
            'eventsQuery'
          ]
        }).then((mutationResult) => {
          notusToast.success('Successfully removed matcher')
        }).catch(error => {
          console.error(error)
          showErrorMessage(error)
        })
      }
    } else {
      notusToast.error('Each event needs at least one matcher.')
    }
  }

  doGenericUpdateEvent = (event = this.state.event, successMessage = 'Updated event') => {
    if (this.isCreateMode()) { return }

    event = this.eventEntityToDto(event)

    debug('doGenericUpdateEvent: ', event)

    const variables = {
      event
    }

    const successCallback = () => {
      notusToast.success(successMessage)
    }

    return this.runUpdateEventMutation(variables, successCallback)
  }

  onChangeWebhookUrl = (webhookUrl) => {
    let event = { ...this.state.event }
    event.webhookUrl = webhookUrl
    this.setState({
      event
    }, () => {
      this.doGenericUpdateEvent({ id: event.id, webhookUrl })
    })
  }

  onChangeWebhookBody = (webhookBody) => {
    let event = { ...this.state.event }
    event.webhookBody = webhookBody
    this.setState({
      event
    }, () => {
      this.doGenericUpdateEvent({ id: event.id, webhookBody })
    })
  }

  onChangeDeleteWebhook = () => {
    let event = { ...this.state.event }
    if (event.webhookUrl === null && event.webhookBody === null) { return }
    event.webhookUrl = null
    event.webhookBody = null
    this.setState({
      event
    }, () => {
      this.doGenericUpdateEvent({ id: event.id, webhookUrl: null, webhookBody: null }, 'Webhook has been deleted')
    })
  }

  onChangeSendEmail = (sendEmail) => {
    let event = { ...this.state.event }
    // if (event.sendEmail === sendEmail) { return }
    event.sendEmail = sendEmail
    this.setState({
      event
    }, () => {
      this.doGenericUpdateEvent({ id: event.id, sendEmail }, sendEmail ? 'Emails are on' : 'Emails are off')
    })
  }

  render () {
    const { eventData } = this.props

    let recipe = {}

    if (eventData) {
      const error = eventData && eventData.error
      const loading = eventData && eventData.loading
      recipe = eventData && eventData.event
      
      if (loading) {
        return null
      } else if (error) {
        let errorMsg = `There was an issue loading this page: ${error.message}`
        const gqlError = eventData?.error?.graphQLErrors?.[0].message?.error
        if (gqlError === 'Not Found') {
          errorMsg = 'This event has been deleted'
        } else if (gqlError === 'Unauthorized') {
          errorMsg = 'You are not allowed to view this private event'
        }
        notusToast.error(errorMsg)
        
        return <Redirect to={routes.MY_EVENTS} />
      } else if (!recipe) {
        return null
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
        </button>

        <EventSource
          event={this.state.event}
          onChangeScopeAndAbiEventId={this.onChangeScopeAndAbiEventId}
          handleToggleEventSource={this.handleToggleEventSource}
        />
        {this.state.event.abiEventId ? `event ` : ``}
        <ContractABIEvent
          event={this.state.event}
          onChangeAbiEventId={this.onChangeAbiEventId}
          handleToggleEventSource={this.handleToggleEventSource}
        />
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

    if (!this.isCreateMode() && !this.state.event.title) {
      return null
      // return <Loading />
    }

    const pageTitle = (!this.isCreateMode() && this.state.event.title)
      ? `Editing '${this.state.event.title}'`
      : `Creating a New Event`

    return (
      <div className='is-positioned-absolutely'>
        <Helmet
          title={pageTitle}
        />

        <ScrollToTop />

        <section className='section section--main-content'>
          <div
            className={`container-fluid pb20 color-block`}
            style={{
              backgroundColor: this.state.event.color
            }}
          >
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 pt20'>

                  {recipe && this.isCreateMode() &&
                    <div className='row'>
                      <div className='col-xs-12'>
                        <h6 className='is-size-6 has-text-weight-semibold has-text-lighter pb10'>
                          Creating a new event{recipe.title ? ` based on "${recipe.title}"` : ''}
                        </h6>
                      </div>
                    </div>
                  }

                  <div className='row'>
                    <div className='col-xs-12 col-sm-6 col-xl-8 is-flex'>
                      <EventTitle
                        event={this.state.event}
                        handleSubmitTitle={this.handleSubmitTitle}
                      />
                    </div>

                    <div className='col-xs-12 col-sm-6 col-xl-4 is-flex'>
                      <div className='justify-content-flex-end'>
                        {!this.isCreateMode() &&
                          <>
                            <div className="buttons">
                              <ActiveButton
                                event={this.state.event}
                                handleToggleActive={this.handleToggleActive}
                              />

                              <PublishButton
                                event={this.state.event}
                                handleTogglePublish={this.handleTogglePublish}
                              />
                            </div>
                          </>
                        }
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div
            className={`event-box event-box__header color-block is-top-layer`}
            style={{
              backgroundColor: this.state.event.color
            }}
          >
            <div className='is-brightness-70 is-full-width-background' />

            <div className={`container-fluid`}>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12'>
                    {runCountAndScopeSentences}
                    {matcherSentences}

                    <div className='row'>
                      <div className='col-xs-12 col-sm-3'>
                        <button
                        className='button has-icon plus-button mt10 pl10 pr10 is-light is-small has-fat-icons'
                        onClick={this.handleAddMatcher}
                        >
                        <Plus
                          className='icon__button has-stroke-white'
                        />
                        </button>  
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`event-box event-box__footer color-block`}
            style={{
              backgroundColor: this.state.event.color
            }}
          >
            <div className='is-brightness-40 is-full-width-background' />
            <EventAction
              {...this.props}
              event={this.state.event}
              sendEmail={this.state.event.sendEmail}
              webhookUrl={this.state.event.webhookUrl}
              webhookBody={this.state.event.webhookBody}
              onChangeSendEmail={this.onChangeSendEmail}
              onChangeWebhookUrl={this.onChangeWebhookUrl}
              onChangeWebhookBody={this.onChangeWebhookBody}
              onChangeDeleteWebhook={this.onChangeDeleteWebhook}
              />
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
