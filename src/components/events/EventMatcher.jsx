import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { Edit, XCircle, Menu } from 'react-feather'

const DragHandle = (() => <span className='drag-handle'>
  <Menu />
</span>)

export const EventMatcher = 
  class _EventMatcher extends PureComponent {

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

      const {
        source
      } = matcher

      const andWord = (isFirst) ? 'where' : '... and'
      
      const humanReadableDescription = (
        <>
          {andWord} the {source.replace('.', ' ')} is
        </>
      )

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
            {humanReadableDescription}&nbsp;
            {/* {this.convertTemplate(matcher)} */}
          </button>

          <span className="icons">
            <button
              className='button has-icon has-icon__transparent has-stroke-light edit'
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