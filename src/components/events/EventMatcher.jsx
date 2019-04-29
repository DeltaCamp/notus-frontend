import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { XCircle, Menu } from 'react-feather'
import { MatcherOperand } from '~/components/events/MatcherOperand'
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
      
      const andWord = isFirst ? 'where' : '... and'

      return (
        <div className='event-box__variable-wrapper event-box__variable-wrapper__matcher'>
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
          
          <MatcherOperand
            handleEdit={this.handleEdit}
            matcher={matcher}
            onChange={this.props.onChangeMatcher}
          />

          <div className='buttons buttons-right'>
            <button
              className='button has-icon is-light' 
              onClick={this.handleRemove}
            >
              <XCircle
                className='icon__button has-stroke-red'
              />
            </button>
          </div>
        </div>
      )
    }
  }
