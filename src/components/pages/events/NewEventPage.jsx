import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import arrayMove from 'array-move'
import ReactTimeout from 'react-timeout'
import { formatRoute } from 'react-router-named-routes'
import { orderBy } from 'lodash'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { CheckCircle, PlusCircle } from 'react-feather'
import { toast } from 'react-toastify'
import { graphql } from 'react-apollo'

import { EventTitle } from '~/components/events/EventTitle'
import { FrequencyTitle } from '~/components/events/FrequencyTitle'
import { ContractForm } from '~/components/forms/ContractForm'
import { ScopeSelect } from '~/components/ScopeSelect'
import { AbiEventSelect } from '~/components/AbiEventSelect'
import { Modal } from '~/components/Modal'
import { Drawer } from '~/components/Drawer'
import { EventMatcher } from '~/components/events/EventMatcher'
import { MatcherForm } from '~/components/recipes/MatcherForm'
import { FooterContainer } from '~/components/layout/Footer'
import { ScrollToTop } from '~/components/ScrollToTop'
import { createEventMutation } from '~/mutations/createEventMutation'
import { eventQuery } from '~/queries/eventQuery'
import { altBrandColor, brandColor } from '~/utils/brandColors'
import { deepCloneMatcher } from '~/utils/deepCloneMatcher'
import { IsAuthed } from '~/components/IsAuthed'
import * as routes from '~/../config/routes'
import {
  SCOPES
} from '~/constants'

export const NewEventPage = 
  IsAuthed(
    graphql(eventQuery, {
      name: 'eventData',
      skip: (props) => !props.match.params.parentEventId,
      options: (props) => ({
        variables: { id: parseInt(props.match.params.parentEventId, 10) }
      })
    })(
      graphql(createEventMutation, {
        name: 'createEventMutation'
      })(
        ReactTimeout(class _NewEventPage extends Component {
          state = {
            event: {
              scope: 0,
              abiEventId: null,
              isPublic: false,
              title: '',
              // frequency: '-1',
              matchers: [
                {
                  operand: "0",
                  operandDataType: 0,
                  operator: 2,
                  order: 1,
                  source: "transaction.value"
                }
              ]
            },
            editMatcherIndex: null,
            newEventTitle: '',
            showEventForm: false,
            showAddContract: false
          }

          static propTypes = {
            match: PropTypes.object.isRequired
          }

          static contextTypes = {
            router: PropTypes.object.isRequired
          }

          componentDidUpdate(prevProps) {
            let recipe

            if (
              prevProps.eventData
              && (prevProps.eventData.event !== this.props.eventData.event)
            ) {
              recipe = this.props.eventData.event

              const matchers = recipe.matchers.map(matcher => deepCloneMatcher(matcher))

              const event = {
                isPublic: false,
                matchers: orderBy(matchers, 'order'),
                parentId: parseInt(recipe.id, 10)
              }

              this.setState({
                event: {
                  ...this.state.event,
                  ...event
                }
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

          handleCancelEditingMatcher = (e) => {
            e.preventDefault()

            this.handleSetEditMatcher(null)
          }

          showAddContract = (e) => {
            e.preventDefault()
            this.setState({
              showAddContract: true
            })
          }

          hideAddContract = () => {
            this.setState({
              showAddContract: false
            })
          }

          handleOnCreateAbi = (abi) => {
            let event = {...this.state.event}
            if (abi.abiEvents.length) {
              event.abiEventId = abi.abiEvents[0].id
            }
            
            this.setState({
              showAddContract: false,
              event
            })
          }

          showEventForm = () => {
            this.setState({ showEventForm: true })
          }

          hideEventForm = () => {
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
          }

          onChangeScope = (option) => {
            this.setState({
              event: {
                ...this.state.event,
                scope: option.value
              }
            })
          }

          onChangeAbiEvent = (option) => {
            this.setState({
              event: {
                ...this.state.event,
                abiEventId: parseInt(option.value, 10)
              }
            })
          }

          handleAddMatcher = () => {
            const newMatcher = {
              operand: "0",
              operandDataType: 0,
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

            const { eventData } = this.props

            const editMatcher = this.isEditingMatcher()
              ? this.state.event.matchers[this.state.editMatcherIndex]
              : null

            let recipe = {
              title: 'event'
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
                    altColorClass = altBrandColor(recipe.id + 1)
                  }
                }
              }
            }

            if (editMatcher) {
              variableForm = (
                <form className='form drawer-form'>
                  <MatcherForm
                    key={`matcher-${this.state.matcherIndex}`}
                    matcher={editMatcher}
                    onChange={
                      (updatedMatcher) => this.onChangeMatcher(updatedMatcher)
                    }
                  />

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
              )
            }

            const matcherSentences = (
              <>
                <div className='event-box__variable-wrapper' onClick={this.showEventForm}>
                  <div className='event-box__variable'>
                    <span className="event-box__text">
                      <FrequencyTitle frequency={this.state.event.frequency} /> <EventTitle event={this.state.event} /> occurs
                    </span>
                  </div>
                </div>


                {/* <MatcherDragDropContext 

                /> */}
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {this.state.event.matchers.map((eventMatcher, index) => (
                          <Draggable key={`event-matcher-${index}`} draggableId={index+1} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <EventMatcher
                                  key={`event-matcher-${index}`}
                                  matcher={eventMatcher}
                                  index={index}
                                  handleSetEditMatcher={this.handleSetEditMatcher}
                                  handleRemoveMatcher={this.handleRemoveMatcher}
                                  isFirst={index === 0}
                                  isActive={!!editMatcher && eventMatcher === editMatcher}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            )

            let abiEventSelect, addContract
            if (this.state.event.scope === SCOPES.CONTRACT_EVENT) {
              abiEventSelect =
                <AbiEventSelect
                  value={this.state.event.abiEventId}
                  onChange={this.onChangeAbiEvent}
                  />
              addContract = <button onClick={this.showAddContract} className='button'>add contract</button>
            }

            return (
              <div className='is-positioned-absolutely'>
                <Helmet
                  title='Create New Event'
                />

                <ScrollToTop />

                <Drawer show={this.isEditingMatcher()} onClose={this.handleCancelEditingMatcher}>
                  {variableForm}
                </Drawer>

                <Drawer show={this.state.showEventForm} onClose={this.hideEventForm}>
                  <form className='form drawer-form'>
                    <ScopeSelect value={this.state.event.scope} onChange={this.onChangeScope} />
                    {abiEventSelect}
                    {addContract}
                  </form>
                </Drawer>

                <Modal isOpen={this.state.showAddContract} handleClose={this.hideAddContract}>
                  {
                    this.state.showAddContract && 
                    <ContractForm onCancel={this.hideAddContract} onCreate={this.handleOnCreateAbi} />
                  }
                </Modal>

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

                  <div className={`event-box event-box__header color-block ${colorClass}`}>
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

                  <div className={`event-box event-box__footer color-block ${altColorClass}`}>
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
                              disabled={this.state.isCreating}
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
        })
      )
    )
  )