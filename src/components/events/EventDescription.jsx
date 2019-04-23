import React from 'react'

import { EventTitle } from '~/components/events/EventTitle'
import { MatcherTitle } from '~/components/events/MatcherTitle'
import { FrequencyTitle } from '~/components/events/FrequencyTitle'

export const EventDescription = function ({event, brief = false}) {

  let matchers
  if (brief) {
    const matcher = event.matchers[0]
    let ellipses
    if (event.matchers.length > 1) {
      ellipses = <span>&nbsp;...</span>
    }
    matchers =
      <span key='matcher'>
        <MatcherTitle matcher={matcher} isFirst={true} />
        {ellipses}
      </span>
  } else {
    matchers = event.matchers.map((matcher, index) => {
      return <MatcherTitle key={`matcher-${index}`} matcher={matcher} isFirst={index === 0} />
    })
  }

  return (
    <>
      <FrequencyTitle frequency={event.frequency} key='frequency-title' />&nbsp;
      <EventTitle event={event} key='event-title' />&nbsp;
      occurs&nbsp;
      {matchers} then send me an email
    </>
  )
}