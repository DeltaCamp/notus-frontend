import { SOURCES } from '~/constants'

export function calculateSourceDataType(source, abiEventInput) {
  let type

  if (abiEventInput && source.source === SOURCES.CONTRACT_EVENT_INPUT) {
    type = abiEventInput.type
  } else {
    type = source.dataType
  }

  return type
}
