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

import { CreateEventModal } from '~/components/events/CreateEventModal'
import { EditEventButtons } from '~/components/events/EditEventButtons'
import { EventAction } from '~/components/events/EventAction'
import { EventTitle } from '~/components/events/EventTitle'
import { EventMatcher } from '~/components/events/EventMatcher'
import { ContractAbiEvent } from '~/components/events/ContractAbiEvent'
import { RunCountTitle } from '~/components/events/RunCountTitle'
import { EventSource } from '~/components/events/EventSource'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { NetworkSelect } from '~/components/forms/NetworkSelect'
import { isValidScopeSource } from '~/utils/isValidScopeSource'
import { isValidMatcherForAbiEvent } from '~/utils/isValidMatcherForAbiEvent'
import { notusToast } from '~/utils/notusToast'
import { showErrorMessage } from '~/utils/showErrorMessage'
import { SCOPES } from '~/constants'
import * as routes from '~/../config/routes'

const debug = require('debug')('notus:components:EditEventPage')

const randomColor = () => {
  return sample([
    '#3a084f', // dark purple
    '#0b603a', // forest green
    '#06368b', // dark blue
    '#dd5500', // orange
    '#0676cb', // light blue
    '#6e0ad3', // purple
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
      callWebhook: false,
      runCount: -1,
      networkId: 1,
      matchers: [
        /*
        {
          operand: '10000000000000000000',
          operator: 3,
          order: 1,
          source: 'transaction.value'
        }
        */
      ]
    },
    editMatcherIndex: null,
    editingEventSource: false,
    editingNetwork: false,
    createEventModalOpen: false
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

  handleToggleEditingEventSource = (newValue) => {
    debug('handleToggleEditingEventSource', newValue)


    this.setState({ editingEventSource: newValue })
  }

  handleToggleEditingNetwork = (newValue) => {
    debug('handleToggleEditingNetwork', newValue)

    this.setState({ editingNetwork: newValue })
  }

  eventEntityToDto(event) {
    event = this.scrubEvent(event)
    if (event.abiEventId !== undefined) {
      event.abiEventId = parseInt(event.abiEventId, 10)
    }
    
    if (event.matchers) {
      event.matchers = event.matchers.map(matcher => this.matcherEntityToDto(matcher))
    }
    return event
  }

  matcherEntityToDto(matcher) {
    return deepCloneMatcher(matcher)
  }

  scrubEvent(event) {
    return omit(
      event,
      '__typename',
      'createdAt',
      'contract',
      'updatedAt',
      'contract',
      'parent',
      'user'
    )
  }

  handleSubmitTitle = (newEventTitle, callback) => {
    this.doGenericUpdateEvent(
      {
        id: this.state.event.id,
        title: newEventTitle
      },
      'Updated event title'
    ).then(() => {
      if (callback) { callback() }
    })
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

    this.doGenericUpdateEvent({
      id: this.state.event.id,
      matchers
    }, 'Updated matcher positions')
  }

  handleSaveEvent = (e) => {
    if (e) {
      e.preventDefault()
    }

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

    event = this.eventEntityToDto(event)

    this.props.createEventMutation({
      variables: {
        event
      },
      refetchQueries: [
        'eventsQuery'
      ]
    }).then((mutationResult) => {
      this.handleCloseCreateEventModal()
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

  handleChangeRunCount = () => {
    const runCount = this.state.event.runCount === 0 ? -1 : 0
    const event = {
      ...this.state.event,
      runCount
    }
    this.doGenericUpdateEvent({id: event.id, runCount }, `Event will run ${RunCountTitle(runCount).toLowerCase()}`)
  }

  handleTogglePublish = () => {
    const { currentUser } = this.props
    if (currentUser && !currentUser.confirmedAt) {
      notusToast.info(`You will need to confirm your ${currentUser.email} email address before you can publish the event`)
      this.props.history.push(routes.ACCOUNT_SETTINGS)
      return
    }

    const isPublic = !this.state.event.isPublic
    const event = {
      ...this.state.event,
      isPublic
    }
    this.doGenericUpdateEvent(event, `Event is now ${isPublic ? 'visible to everyone' : 'now only visible to you'}`)
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

  // handleChangeMatcher = (updatedMatcher) => {
  //   this.onChangeMatcher(updatedMatcher)
  // }

  onChangeMatcher = (matcher) => {
    const matchers = this.state.event.matchers.slice()
    const index = this.state.editMatcherIndex

    matchers[index] = matcher

    this.setState({
      event: {
        ...this.state.event,
        matchers
      }
    })

    if (matcher.id) {
      this.props.updateMatcherMutation({
        variables: {
          matcher: matchers[index]
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
    } else if (!this.isCreateMode()) {
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

        const { data: { createMatcher }} = mutationResult
        const matchers = this.state.event.matchers.slice()
        matchers[index] = createMatcher

        this.setState({
          event: {
            ...this.state.event,
            matchers
          }
        })

      }).catch(error => {
        showErrorMessage(error)
      }).finally(() => {
        this.handleSetEditMatcher(null)
      })
    }
  }

  onChangeScopeAndContractId = ({ scope, contract }) => {
    let abiEvent
    let abiEventId = null
    if (contract && contract.abi && contract.abi.abiEvents) {
      abiEvent = contract.abi.abiEvents[0]
      abiEventId = parseInt(abiEvent.id, 10)
    }

    const matchers = this.state.event.matchers.map(matcher => {
      let clone = { ...matcher }

      const isNowInvalid = (
           !isValidMatcherForAbiEvent(abiEvent, matcher)
        || !isValidScopeSource(scope, matcher.source)
      )

      if (isNowInvalid) {
        clone.operand = ''

        const source = scope === SCOPES.BLOCK
          ? 'block.number'
          : 'transaction.value'
        clone.source = source
      }

      return clone
    })

    let contractId
    if (contract) {
      contractId = parseInt(contract.id, 10)
    }

    this.doGenericUpdateEvent({
      id: this.state.event.id,
      matchers,
      scope,
      contract,
      contractId,
      abiEventId
    })
  }

  onChangeAbiEventId = ({ abiEvent }) => {
    const matchers = this.state.event.matchers.map(matcher => {
      let clone = { ...matcher }

      if (!isValidMatcherForAbiEvent(abiEvent, matcher)) {
        clone.operand = ''

        const source = this.state.event.scope === SCOPES.BLOCK
          ? 'block.number'
          : 'transaction.value'
        clone.source = source
      }

      return clone
    })

    this.doGenericUpdateEvent({
      id: this.state.event.id,
      matchers,
      abiEventId: parseInt(abiEvent.id, 10),
    })
  }

  onChangeWebhookHeader = (webhookHeader, index) => {
    debug('onChangeWebhookHeader: ', webhookHeader)

    if (!this.isCreateMode()) {
      this.props.createWebhookHeaderMutation({
        variables: {
          webhookHeader
        },
        refetchQueries: [
          // only refetch the event or webhookHeader we just created (1 record)
          'eventsQuery'
        ]
      }).then((mutationResult) => {
        debug('onChangeWebhookHeader result: ', mutationResult)
  
        const webhookHeaderResult = mutationResult.data.createWebhookHeader
  
        const webhookHeaders = this.state.event.webhookHeaders.slice()
  
        if (webhookHeader.id) {
          notusToast.success('Updated webhook header')
        } else {          
          notusToast.success('Added new webhook header')
        }

        webhookHeaders[index] = webhookHeaderResult

        this.setState({
          event: {
            ...this.state.event,
            webhookHeaders
          }
        })

      }).catch(error => {
        showErrorMessage(error)
      })
    }
  }

  onAddWebhookHeader = () => {
    const newWebhookHeader = {
      key: '',
      value: '',
      eventId: parseInt(this.state.event.id, 10) || undefined
    }

    const webhookHeaders = (this.state.event.webhookHeaders || []).concat([newWebhookHeader])

    debug('onAddWebhookHeader: ', webhookHeaders)

    this.setState({
      event: {
        ...this.state.event,
        webhookHeaders
      }
    })
  }

  onDeleteWebhookHeader = (webhookHeader, index) => {
    const webhookHeaders = this.state.event.webhookHeaders
    const id = webhookHeader.id

    debug('onDeleteWebhookHeader: ', webhookHeaders, webhookHeader, index)

    webhookHeaders.splice(index, 1)

    this.setState({
      event: {
        ...this.state.event,
        webhookHeaders
      }
    })

    if (!this.isCreateMode() && id) {
      this.props.destroyWebhookHeaderMutation({
        variables: {
          id
        },
        refetchQueries: [
          // only refetch the event we just updated (1 record)
          'eventsQuery'
        ]
      }).then((mutationResult) => {
        notusToast.success('Successfully removed webhook header')
      }).catch(error => {
        console.error(error)
        showErrorMessage(error)
      })
    }
  }

  handleAddMatcher = () => {
    const source = this.state.event.scope === SCOPES.BLOCK
      ? 'block.number'
      : 'transaction.value'

    const newMatcher = {
      operand: '',
      operator: 2,
      order: this.state.event.matchers.length,
      source,
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

    matchers.splice(matcherIndex, 1)

    this.setState({
      event: {
        ...this.state.event,
        matchers
      }
    })

    if (id) {
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
  }

  doGenericUpdateEvent = (event, successMessage = 'Updated event') => {
    const oldEvent = {...this.state.event}

    const newEvent = {
      ...oldEvent,
      ...event
    }

    const eventDto = this.eventEntityToDto(event)

    debug('doGenericUpdateEvent: ', eventDto)

    this.setState({
      event: newEvent
    })

    if (!this.isCreateMode()) {
      return this.props.updateEventMutation({
        variables: {
          event: eventDto
        },
        refetchQueries: [
          // only refetch the event we just updated (1 record)
          'eventsQuery'
        ]
      }).then(() => {
        notusToast.success(successMessage)
      }).catch(error => {
        console.error(error)
        showErrorMessage(error)
        this.setState({
          event: oldEvent
        })
      })
    } else {
      return Promise.resolve()
    }
  }

  onChangeWebhookUrl = (webhookUrl) => {
    let event = { ...this.state.event }
    event.webhookUrl = webhookUrl
    this.doGenericUpdateEvent({ id: event.id, webhookUrl })
  }

  onChangeWebhookBody = (webhookBody) => {
    let event = { ...this.state.event }
    event.webhookBody = webhookBody
    this.doGenericUpdateEvent({ id: event.id, webhookBody })
  }

  onChangeCallWebhook = (callWebhook) => {
    let event = { ...this.state.event }
    event.callWebhook = callWebhook
    this.doGenericUpdateEvent({ id: event.id, callWebhook }, `Webhook is now ${callWebhook ? 'active' : 'inactive'}`)
  }

  onChangeSendEmail = (sendEmail) => {
    let event = { ...this.state.event }
    if (event.sendEmail === sendEmail) { return }
    event.sendEmail = sendEmail
    this.doGenericUpdateEvent({ id: event.id, sendEmail }, sendEmail ? 'Emails are on' : 'Emails are off')
  }

  handleOpenCreateEventModal = (e) => {
    e.preventDefault()

    this.setState({ createEventModalOpen: true })
  }

  handleCloseCreateEventModal = (e) => {
    if (e) {
      e.preventDefault()
    }

    this.setState({ createEventModalOpen: false })
  }

  handleChangeNetworkId = (networkId, networkName) => {
    let event = { ...this.state.event }
    networkId = parseInt(networkId, 10)
    if (event.networkId === networkId) {
      return
    }
    event.networkId = networkId
    this.doGenericUpdateEvent({ id: event.id, networkId }, `Network is now ${networkName}`)
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

        let gqlError
        if (eventData?.error?.graphQLErrors?.[0]) {
          gqlError = eventData?.error?.graphQLErrors?.[0].message?.error
        }

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
        // {
        //   'react-select--is-active': this.state.editingEventSource
        // }
      )}>
        

        <span className='event-box__flex-mobile-group'>
          <button
            className='event-box__variable event-box__variable__half-width'
            onClick={this.handleChangeRunCount}
          >
            <RunCountTitle
              runCount={this.state.event.runCount}
            />
          </button>
          
          <EventSource
            event={this.state.event}
            onChangeScopeAndContractId={this.onChangeScopeAndContractId}
            handleToggleEditingEventSource={this.handleToggleEditingEventSource}
          />

          <ContractAbiEvent
            event={this.state.event}
            onChangeAbiEventId={this.onChangeAbiEventId}
            handleToggleEditingEventSource={this.handleToggleEditingEventSource}
          />

          <span>
            {this.state.event.scope === SCOPES.CONTRACT_EVENT ? `event ` : ``}
            occurs
          </span>
        </span>
      </div>
    )

    const networkSentence = 
      <span
        className={classnames(
          'event-box__flex-mobile-group',
          // {
          //   'react-select--is-active': this.state.editingNetwork
          // }
        )}
      >
        <span className='mr5'>
          On 
        </span>

        <NetworkSelect
          networkId={parseInt(this.state.event.networkId, 10)}
          onChangeNetworkId={this.handleChangeNetworkId}
          handleToggleEditingNetwork={this.handleToggleEditingNetwork}
        />
      </span>

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
                    // {
                    //   'react-select--is-active': index === this.state.editMatcherIndex
                    // }
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
                            >
                              <EventMatcher
                                key={`event-matcher-${eventMatcher.id || `new-${index}`}`}
                                isFirst={index === 0}
                                index={index}
                                handleSetEditMatcher={this.handleSetEditMatcher}
                                handleRemoveMatcher={this.handleRemoveMatcher}
                                matcher={eventMatcher}
                                event={this.state.event}
                                onChangeMatcher={this.onChangeMatcher}
                                dragHandleProps={provided.dragHandleProps}
                              />
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
                        <h6 className='is-size-6 has-text-weight-semibold has-text-lighter'>
                          Creating a new event{recipe.title ? ` based on "${recipe.title}"` : ''}
                        </h6>
                      </div>
                    </div>
                  }


                  {!this.isCreateMode() &&
                    <div className='row'>
                      <div className='col-xs-12 col-sm-6 col-xl-8 is-flex'>
                        <EventTitle
                          event={this.state.event}
                          handleSubmitTitle={this.handleSubmitTitle}
                        />
                      </div>
                    </div>
                  }

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
            <div className='is-brightness-60 is-full-width-background' />

            <div className={`container-fluid`}>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-12'>
                    {networkSentence}
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
              handleTogglePublish={this.handleTogglePublish}
              callWebhook={this.state.event.callWebhook}
              webhookUrl={this.state.event.webhookUrl}
              webhookBody={this.state.event.webhookBody}
              onChangeSendEmail={this.onChangeSendEmail}
              onChangeWebhookUrl={this.onChangeWebhookUrl}
              onChangeWebhookBody={this.onChangeWebhookBody}
              onChangeCallWebhook={this.onChangeCallWebhook}
              onChangeWebhookHeader={this.onChangeWebhookHeader}
              onAddWebhookHeader={this.onAddWebhookHeader}
              onDeleteWebhookHeader={this.onDeleteWebhookHeader}
              />
          </div>

          {this.isCreateMode() && this.state.createEventModalOpen &&
            <CreateEventModal
              {...this.props}
              event={this.state.event}
              createEventModalOpen={this.state.createEventModalOpen}
              handleSubmitTitle={this.handleSubmitTitle}
              handleSaveEvent={this.handleSaveEvent}
              handleCloseCreateEventModal={this.handleCloseCreateEventModal}
            />
          }

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
                      handleOpenCreateEventModal={this.handleOpenCreateEventModal}
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
