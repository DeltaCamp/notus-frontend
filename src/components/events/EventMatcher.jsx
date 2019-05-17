import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { X, Menu } from 'react-feather'
import { MatcherOperand } from '~/components/events/MatcherOperand'
import { MatcherOperator } from '~/components/events/MatcherOperator'
import { MatcherSource } from '~/components/events/MatcherSource'

const DragHandle = () => <span className='drag-handle'>
  <Menu />
</span>

export const EventMatcher =
  class _EventMatcher extends PureComponent {
    static propTypes = {
      isFirst: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
      handleSetEditMatcher: PropTypes.func.isRequired,
      handleRemoveMatcher: PropTypes.func.isRequired,
      matcher: PropTypes.object.isRequired,
      onChangeMatcher: PropTypes.func.isRequired
    }

    handleClearEditMatcher = () => {
      this.props.handleSetEditMatcher(null)
    }

    handleSetEditMatcher = () => {
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
          <span className='event-box__flex-mobile-group'>
            <DragHandle />

            {andWord} the

            <div className='buttons buttons-right'>
              <button
                className='button has-icon plus-button is-light has-fat-icons'
                onClick={this.handleRemove}
              >
                <X
                  className='icon__button has-stroke-white'
                />
              </button>
            </div>
          </span>

          <MatcherSource
            abiEventInputId={matcher.abiEventInputId}
            event={this.props.event}
            handleSetEditMatcher={this.handleSetEditMatcher}
            handleClearEditMatcher={this.handleClearEditMatcher}
            matcher={matcher}
            onChange={this.props.onChangeMatcher}
            scope={this.props.scope}
          />

          <MatcherOperator
            event={this.props.event}
            handleSetEditMatcher={this.handleSetEditMatcher}
            handleClearEditMatcher={this.handleClearEditMatcher}
            matcher={matcher}
            onChange={this.props.onChangeMatcher}
          />

          <MatcherOperand
            index={this.props.index}
            handleSetEditMatcher={this.handleSetEditMatcher}
            matcher={matcher}
            onChange={this.props.onChangeMatcher}
          />
        </div>
      )
    }
  }
