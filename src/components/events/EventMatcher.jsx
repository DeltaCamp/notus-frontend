import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { Edit, XCircle, Menu } from 'react-feather'
import PropTypes from 'prop-types'

import { MatcherTitle } from '~/components/events/MatcherTitle'

const DragHandle = (() => <span className='drag-handle is-hidden-touch'>
  <Menu />
</span>)

export const EventMatcher = 
  class _EventMatcher extends PureComponent {

    static propTypes = {
      isFirst: PropTypes.bool.isRequired,
      matcher: PropTypes.object.isRequired,
      index: PropTypes.number.isRequired,
      handleSetEditMatcher: PropTypes.func.isRequired,
      handleRemoveMatcher: PropTypes.func.isRequired,
      isActive: PropTypes.bool.isRequired
    }

    handleEdit = (e) => {
      e.preventDefault()
      this.props.handleSetEditMatcher(this.props.index)
    }

    handleRemove = (e) => {
      e.preventDefault()
      this.props.handleRemoveMatcher(this.props.index)
    }

    // convertTemplate = (matcher) => {
    //   let {
    //     operand,
    //     operator,
    //     source
    //   } = matcher

    //   // operandDataType is units: ether, gwei, etc

    //   // console.log('template lookup is: ', `templates.${source}.${operator}`)
    //   const template = CONSTANTS.en.templates[source][operator]


    //   if (!template) {
    //     return operand
    //   }

    //   if (operand === '') {
    //     return template
    //   }

    //   return template.replace(/(\[.*\])/, operand)
    // }

    render () {
      const {
        isFirst,
        matcher
      } = this.props
      
      const humanReadableDescription = <MatcherTitle matcher={matcher} isFirst={isFirst} />

      return (
        <div
          className={classnames(
            `event-box__variable-wrapper`,
            {
              'is-active': this.props.isActive
            }
          )}
        >
          <DragHandle />
          <button
            className={classnames(
              `event-box__variable`,
              {
                'is-active': this.props.isActive
              }
            )}
            onClick={this.handleEdit}
          >
            {humanReadableDescription}
            {/* {this.convertTemplate(matcher)} */}
          </button>

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