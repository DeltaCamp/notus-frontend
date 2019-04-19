import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

export const EventAction = 
  class _EventAction extends PureComponent {

    // static propTypes = {
    // }

    render () {
      return (
        <>
          <div
            className='event-box__variable-wrapper'
            onClick={this.showEventForm}
          >
            <div className='event-box__variable event-box__action has-text-right'>
              {/* ... then turn on my Phillips Hue lightbulb */}
              ... then send me an email.
            </div>
          </div>
        </>
      )
    }
  }