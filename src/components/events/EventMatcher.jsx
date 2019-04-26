import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Edit, XCircle, Menu } from 'react-feather'
import { MatcherOperator } from '~/components/events/MatcherOperator'
import { MatcherSource } from '~/components/events/MatcherSource'

const DragHandle = (() => <span className='drag-handle is-hidden-touch'>
  <Menu />
</span>)

export const EventMatcher = 
  class _EventMatcher extends PureComponent {

    static propTypes = {
      editMatcher: PropTypes.object,
      isFirst: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
      handleSetEditMatcher: PropTypes.func.isRequired,
      handleRemoveMatcher: PropTypes.func.isRequired,
      matcher: PropTypes.object.isRequired,
      onChangeMatcher: PropTypes.func.isRequired
    }

    handleEdit = () => {
      this.props.handleSetEditMatcher(this.props.index)
    }

    handleRemove = (e) => {
      e.preventDefault()

      this.props.handleRemoveMatcher(this.props.index)
    }

    render () {
      const {
        isFirst,
        matcher
      } = this.props
      
      const { operand } = matcher

      const andWord = isFirst ? 'where' : 'and'

      return (
        <div className='event-box__variable-wrapper'>
          <DragHandle />

          {andWord} the
          
          <MatcherSource
            abiEventInputId={matcher.abiEventInputId}
            event={this.props.event}
            handleEdit={this.handleEdit}
            matcher={matcher}
            onChange={this.props.onChangeMatcher}
            scope={this.props.scope}
          />

          <MatcherOperator
            event={this.props.event}
            handleEdit={this.handleEdit}
            matcher={matcher}
            onChange={this.props.onChangeMatcher}
          />
          
          <button
            className='event-box__variable'
            onClick={this.handleEdit}
          >
            {operand || '?'}
          </button>

          {/* <button
            className='event-box__variable'
            onClick={this.handleEdit}
          >
            {humanReadableDescription}
          </button> */}

          <span className="icons">
            <button
              className='button has-icon has-icon__transparent has-stroke-light edit is-hidden-touch'
              onClick={this.handleEdit}
            >
              <Edit
                className='icon__button has-stroke-light'
              />
            </button>

            <button
              className='button has-icon has-icon__transparent has-stroke-light'
              onClick={this.handleRemove}
            >
              <XCircle
                className='icon__button has-stroke-light'
              />
            </button>
          </span>
        </div>
      )
    }
  }
