import { SOURCES } from '~/constants'

export function isValidMatcherForAbiEvent (abiEvent, matcher) {
  if (!abiEvent) {
    return false
  }

  if (matcher.source === SOURCES.CONTRACT_EVENT_INPUT) {
    let match

    match = abiEvent.abiEventInputs.find(abiEventInput => 
      parseInt(abiEventInput.id, 10) === parseInt(matcher.id, 10)
    )

    return !!match
  } else {
    return true
  }
}
